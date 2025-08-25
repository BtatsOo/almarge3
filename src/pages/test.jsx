import React, { useEffect, useRef, useState } from "react";

const VideoTracker = ({
  bunnyVideoUrl,
  studentId,
  videoId,
  onTrackingUpdate,
}) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const trackingIntervalRef = useRef(null);
  const [trackingData, setTrackingData] = useState({
    totalDuration: 0,
    watchedTime: 0,
    watchPercentage: 0,
    isCompleted: false,
    playCount: 0,
    pauseCount: 0,
    seekCount: 0,
    lastPosition: 0,
    watchedSegments: [],
    startTime: null,
    endTime: null,
    isPlaying: false,
  });

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playerStatus, setPlayerStatus] = useState("Loading...");

  // Initialize postMessage communication with Bunny iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMessage = (event) => {
      // Make sure the message is from Bunny CDN
      if (
        !event.origin.includes("mediadelivery.net") &&
        !event.origin.includes("bunnycdn.com")
      )
        return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        console.log("Received message from player:", data);

        // Handle Bunny CDN specific message format
        if (data.type) {
          switch (data.type) {
            case "ready":
              setIsPlayerReady(true);
              setPlayerStatus("Player Ready - Setting up events");
              console.log("Bunny player is ready");

              // Subscribe to events
              iframe.contentWindow.postMessage(
                {
                  type: "addEventListener",
                  event: "play",
                },
                "*"
              );

              iframe.contentWindow.postMessage(
                {
                  type: "addEventListener",
                  event: "pause",
                },
                "*"
              );

              iframe.contentWindow.postMessage(
                {
                  type: "addEventListener",
                  event: "ended",
                },
                "*"
              );

              iframe.contentWindow.postMessage(
                {
                  type: "addEventListener",
                  event: "timeupdate",
                },
                "*"
              );

              iframe.contentWindow.postMessage(
                {
                  type: "addEventListener",
                  event: "seeked",
                },
                "*"
              );

              // Get duration
              iframe.contentWindow.postMessage(
                {
                  type: "getDuration",
                },
                "*"
              );

              startTracking();
              break;

            case "play":
              console.log("Video started playing");
              setTrackingData((prev) => ({
                ...prev,
                playCount: prev.playCount + 1,
                isPlaying: true,
                startTime: prev.startTime || new Date().toISOString(),
              }));
              break;

            case "pause":
              console.log("Video paused");
              setTrackingData((prev) => ({
                ...prev,
                pauseCount: prev.pauseCount + 1,
                isPlaying: false,
              }));
              break;

            case "ended":
              console.log("Video ended");
              setTrackingData((prev) => ({
                ...prev,
                isCompleted: true,
                watchPercentage: 100,
                endTime: new Date().toISOString(),
                isPlaying: false,
              }));
              break;

            case "timeupdate":
              if (data.currentTime !== undefined) {
                updateWatchTime(data.currentTime, data.duration);
              }
              break;

            case "seeked":
              console.log("User seeked in video");
              setTrackingData((prev) => ({
                ...prev,
                seekCount: prev.seekCount + 1,
              }));
              break;

            case "duration":
              if (data.duration) {
                setTrackingData((prev) => ({
                  ...prev,
                  totalDuration: data.duration,
                }));
                console.log("Video duration:", data.duration);
              }
              break;
          }
        }
      } catch (error) {
        console.warn("Error parsing message from player:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // Set up iframe load event
    const handleIframeLoad = () => {
      setPlayerStatus("Iframe loaded, initializing...");
      // Initialize communication with Bunny player
      setTimeout(() => {
        if (iframe.contentWindow) {
          console.log("Sending ready message to player");
          iframe.contentWindow.postMessage(
            {
              type: "ready",
            },
            "*"
          );
        }
      }, 2000);
    };

    iframe.addEventListener("load", handleIframeLoad);

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", handleIframeLoad);
      stopTracking();
    };
  }, [bunnyVideoUrl]);

  const startTracking = () => {
    if (trackingIntervalRef.current) return;

    console.log("Starting tracking interval");
    trackingIntervalRef.current = setInterval(() => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        // Request current time from player
        iframe.contentWindow.postMessage(
          {
            type: "getCurrentTime",
          },
          "*"
        );

        // Also request duration periodically
        iframe.contentWindow.postMessage(
          {
            type: "getDuration",
          },
          "*"
        );
      }
    }, 3000); // Check every 3 seconds
  };

  const stopTracking = () => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
  };

  const updateWatchTime = (currentTime, duration) => {
    setTrackingData((prev) => {
      const watchedTime = Math.max(prev.watchedTime, currentTime);
      const totalDuration = duration || prev.totalDuration;
      const watchPercentage =
        totalDuration > 0 ? (watchedTime / totalDuration) * 100 : 0;

      // Update watched segments
      const newSegments = [...prev.watchedSegments];
      const segmentIndex = Math.floor(currentTime / 10); // 10-second segments
      if (!newSegments.includes(segmentIndex)) {
        newSegments.push(segmentIndex);
      }

      const updatedData = {
        ...prev,
        lastPosition: currentTime,
        watchedTime,
        watchPercentage,
        watchedSegments: newSegments,
        isCompleted: watchPercentage >= 90,
        totalDuration: totalDuration || prev.totalDuration,
      };

      // Call callback with updated data
      if (onTrackingUpdate) {
        onTrackingUpdate(updatedData);
      }

      return updatedData;
    });
  };

  // Alternative tracking method using visibility and focus events
  useEffect(() => {
    let visibilityTimer = null;
    let focusStartTime = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (trackingData.isPlaying && focusStartTime) {
          const focusTime = (Date.now() - focusStartTime) / 1000;
          setTrackingData((prev) => ({
            ...prev,
            watchedTime: prev.watchedTime + Math.min(focusTime, 5), // Max 5 seconds per focus
          }));
        }
        focusStartTime = null;
      } else if (trackingData.isPlaying) {
        focusStartTime = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [trackingData.isPlaying]);

  // Send tracking data to backend
  const sendTrackingData = async (data) => {
    try {
      const response = await fetch("/api/video-tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          videoId,
          trackingData: data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log("Tracking data sent successfully");
      }
    } catch (error) {
      console.error("Failed to send tracking data:", error);
    }
  };

  // Send tracking data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (trackingData.watchedTime > 0) {
        sendTrackingData(trackingData);
      }
    }, 30000); // Send data every 30 seconds

    return () => {
      clearInterval(interval);
      if (trackingData.watchedTime > 0) {
        sendTrackingData({
          ...trackingData,
          endTime: new Date().toISOString(),
        });
      }
    };
  }, [trackingData, studentId, videoId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Video Player */}
        <div
          className="relative w-full"
          style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
        >
          <iframe
            ref={iframeRef}
            src={bunnyVideoUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Tracking Dashboard */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Video Progress Tracking
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">
                Watch Progress
              </div>
              <div className="text-2xl font-bold text-blue-800">
                {trackingData.watchPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-600">
                {formatTime(trackingData.watchedTime)} /{" "}
                {formatTime(trackingData.totalDuration)}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium">
                Completion Status
              </div>
              <div className="text-2xl font-bold text-green-800">
                {trackingData.isCompleted ? "Complete" : "In Progress"}
              </div>
              <div className="text-sm text-green-600">
                {trackingData.watchedSegments.length} segments watched
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">
                Engagement
              </div>
              <div className="text-2xl font-bold text-purple-800">
                {trackingData.playCount}
              </div>
              <div className="text-sm text-purple-600">Play sessions</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Video Progress
              </span>
              <span className="text-sm text-gray-500">
                {trackingData.watchPercentage.toFixed(1)}% watched
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  trackingData.isPlaying ? "bg-green-500" : "bg-blue-600"
                }`}
                style={{
                  width: `${Math.min(trackingData.watchPercentage, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">
                {trackingData.playCount}
              </div>
              <div className="text-gray-600">Plays</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">
                {trackingData.pauseCount}
              </div>
              <div className="text-gray-600">Pauses</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">
                {trackingData.seekCount}
              </div>
              <div className="text-gray-600">Seeks</div>
            </div>
            <div className="text-center">
              <div
                className={`font-semibold ${
                  trackingData.isPlaying ? "text-green-600" : "text-gray-800"
                }`}
              >
                {trackingData.isPlaying ? "▶️" : "⏸️"}
              </div>
              <div className="text-gray-600">Status</div>
            </div>
          </div>

          {/* Manual Testing Controls */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Manual Testing & Debug
            </h4>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  const iframe = iframeRef.current;
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(
                      {
                        type: "play",
                      },
                      "*"
                    );
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Play
              </button>
              <button
                onClick={() => {
                  const iframe = iframeRef.current;
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(
                      {
                        type: "pause",
                      },
                      "*"
                    );
                  }
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Pause
              </button>
              <button
                onClick={() => {
                  const iframe = iframeRef.current;
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(
                      {
                        type: "getCurrentTime",
                      },
                      "*"
                    );
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Get Time
              </button>
              <button
                onClick={() => {
                  // Simulate manual progress update for testing
                  updateWatchTime(Math.random() * 100, 200);
                }}
                className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
              >
                Test Update
              </button>
            </div>
          </div>

          {/* Student Info and Status */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              <strong>Student ID:</strong> {studentId} |{" "}
              <strong>Video ID:</strong> {videoId}
            </div>
            <div className="text-sm text-gray-500">
              <strong>Player Status:</strong> {playerStatus}
              {!isPlayerReady && (
                <span className="ml-2 text-yellow-600">⏳</span>
              )}
              {isPlayerReady && <span className="ml-2 text-green-600">✅</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const Test = () => {
  const handleTrackingUpdate = (trackingData) => {
    console.log("Tracking update:", trackingData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Video Learning Platform
        </h1>

        <VideoTracker
          bunnyVideoUrl="https://iframe.mediadelivery.net/embed/472076/b7a99d30-5ef0-4435-bf1f-3f0efe2dc6d6"
          studentId="student_123"
          videoId="video_456"
          onTrackingUpdate={handleTrackingUpdate}
        />
      </div>
    </div>
  );
};

export default Test;
