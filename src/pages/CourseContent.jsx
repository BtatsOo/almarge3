import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Clock, Users, Star } from "lucide-react";
import { useAuth, useEnroll } from "../helpers/useauth";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { LoadingComponent } from "./Loading";
import axios from "axios";
import { MessageTitle } from "./CourseOverview";

function CourseContent() {
  const { user = {}, auth } = useAuth();
  console.log(auth);

  // check auth
  // const { data: { data } = {}, isLoading } = useAuth();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const lessonid = searchParams.get("lessonid"); // e.g. "John"
  console.log(lessonid);
  const {
    data: { courseContentenrolled } = {},
    isLoading,
    error,
    isError,
  } = useEnroll(id, undefined, lessonid);
  // console.log("loading", isLoading);
  // console.log("loading", isError);
  // console.log("error", error);

  const [selectedLesson, setSelectedLesson] = useState({});
  useEffect(() => {
    setSelectedLesson(courseContentenrolled?.content[0].lessons[0]);
  }, [courseContentenrolled]);
  const countLesson = function () {
    let lessonNumbers = 0;
    const lessons = courseContentenrolled?.content.forEach((topic) => {
      lessonNumbers += topic.lessons.length;
    });
    return lessonNumbers;
  };

  return isLoading ? (
    <div className="bg-white rounded-xl shadow-lg h-full flex items-center justify-center   ">
      <LoadingComponent size="xl" message="يتم التحميل ..." color="blue" />
    </div>
  ) : !auth ? (
    <>
      <div className="mx-auto confirmCard mt-60">
        <MessageTitle>تحتاج لتسجيل دخولك اولا!</MessageTitle>
        <div>
          <Link to={"/login"} className="btn">
            تسجيل دخول
          </Link>
        </div>
      </div>
    </>
  ) : error ? (
    <>
      <div className="mx-auto confirmCard mt-60">
        <MessageTitle className="mb-4">
          ليس لديك صلاحية الدخول لهذا الكورس اشتري الكورس اولا ثم ادخل على هذا
          الرابط!
        </MessageTitle>
        <Link
          className="bg-blue-950 p-2 mt-4 rounded-3xl"
          to={`/courses/${id}`}
        >
          الذهاب لصفحة الشراء
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="p-4 bg-gray-100 flex items-center">
        <button className="text-gray-500 ml-2">←</button>
        <div>
          <h1 className="font-semibold h-full text-lg">
            {courseContentenrolled.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center">
              <Users size={16} className="ml-1 text-blue-800" />
              عدد الدروس {countLesson()}
            </span>

            {/* <span className="flex items-center">
              <Star
                size={16}
                className="ml-1 text-blue-600"
                fill="currentColor"
              />
              {courseInfo.rating} ({courseInfo.reviews} reviews)
            </span> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:items-start justify-start items-center bg-gray-100  md:flex-row md:justify-between">
        <>
          {selectedLesson?.url.includes("youtube.com") ? (
            <YouTubePlayerComponent
              courseContentenrolled={courseContentenrolled}
              selectedLesson={selectedLesson}
              user={user}
            />
          ) : (
            <CourseComponent
              courseContentenrolled={courseContentenrolled}
              selectedLesson={selectedLesson}
              user={user}
            />
          )}

          <CourseList
            courseContentenrolled={courseContentenrolled}
            setSelectedLesson={setSelectedLesson}
          />
        </>
      </div>
    </>
  );
}

// const courseStructure = [
//   {
//     id: "01",
//     title: "مقدمة",
//     duration: "22min",
//     lessons: [
//       { title: "مقدمة", duration: "2 min" },
//       { title: "ما هو Figma؟", duration: "5 min" },
//       { title: "فهم Figma", duration: "12 min" },
//       { title: "جولة في الواجهة", duration: "3 min" },
//     ],
//   },
//   {
//     id: "02",
//     title: "المستوى المتوسط",
//     duration: "1h 20min",
//     lessons: [
//       { title: "العمل مع الإطارات", duration: "15 min" },
//       { title: "إدارة الطبقات", duration: "20 min" },
//       { title: "استخدام القيود", duration: "25 min" },
//       { title: "أساسيات التخطيط التلقائي", duration: "20 min" },
//     ],
//   },
//   {
//     id: "03",
//     title: "المستوى المتقدم",
//     duration: "36min",
//     lessons: [
//       { title: "أنظمة التصميم", duration: "12 min" },
//       { title: "تخطيط تلقائي متقدم", duration: "14 min" },
//       { title: "المتغيرات", duration: "10 min" },
//     ],
//   },
//   {
//     id: "04",
//     title: "الاستيراد والرسومات",
//     duration: "40min",
//     lessons: [
//       { title: "استيراد العناصر", duration: "15 min" },
//       { title: "تحرير المتجهات", duration: "15 min" },
//       { title: "التعامل مع الصور", duration: "10 min" },
//     ],
//   },
//   {
//     id: "05",
//     title: "المكونات في Figma",
//     duration: "1h 12min",
//     lessons: [
//       { title: "إنشاء المكونات", duration: "18 min" },
//       { title: "خصائص المكونات", duration: "22 min" },
//       { title: "نماذج المكونات", duration: "17 min" },
//       { title: "المكونات المتداخلة", duration: "15 min" },
//     ],
//   },
//   {
//     id: "06",
//     title: "الأنماط في Figma",
//     duration: "41min",
//     lessons: [
//       { title: "أنماط الألوان", duration: "12 min" },
//       { title: "أنماط النص", duration: "14 min" },
//       { title: "أنماط التأثيرات", duration: "15 min" },
//     ],
//   },
//   {
//     id: "07",
//     title: "الخاتمة",
//     duration: "8min",
//     lessons: [
//       { title: "مراجعة الدورة", duration: "5 min" },
//       { title: "الخطوات التالية", duration: "3 min" },
//     ],
//   },
// ];

export function CourseList({ courseContentenrolled, setSelectedLesson }) {
  // console.log(selectedLesson);
  // Generate expandedSections state dynamically from course structure
  const initializeExpandedState = (sections) => {
    const initialState = {};
    sections?.forEach((section) => {
      initialState[section._id] = section._id === "6867ddf313f7e7d75507f2ed"; // Only first section is true (01:true) and  expanded by default
    });
    return initialState;
  };
  useEffect(() => {
    const initialState = initializeExpandedState(
      courseContentenrolled?.content
    );
    // console.log(initialState);
    setExpandedSections(initialState);
  }, [courseContentenrolled]);

  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Get total lessons count
  // const totalLessons = courseStructure.reduce((total, section) => {
  //   return total + section.lessons.length;
  // }, 0);

  // Calculate total course duration
  // const getTotalDuration = () => {
  //   let totalMinutes = 0;
  //   courseStructure.forEach((section) => {
  //     // Parse duration string to get minutes
  //     const duration = section.duration;
  //     if (duration.includes("h")) {
  //       const [hours, mins] = duration.split("h ");
  //       totalMinutes += parseInt(hours) * 60;
  //       totalMinutes += parseInt(mins);
  //     } else {
  //       totalMinutes += parseInt(duration);
  //     }
  //   });

  //   // Format total duration
  //   if (totalMinutes >= 60) {
  //     const hours = Math.floor(totalMinutes / 60);
  //     const mins = totalMinutes % 60;
  //     return `${hours}h ${mins}min`;
  //   }
  //   return `${totalMinutes}min`;
  // };
  const navigate = useNavigate();
  let id = 0; // temporary solution !
  return (
    <div className=" w-full  max-w-md bg-white rounded-lg shadow-md border border-gray-200  ">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-[22px] font-semibold text-gray-800">
          محتوى الكورس
        </h2>
        <div className="text-xs text-gray-500">
          {/* <span>{totalLessons} lessons</span> */}
          {/* <span className="mx-1">•</span> */}
          {/* <span>{getTotalDuration()}</span> */}
        </div>
      </div>

      <div className="divide-y divide-gray-200 overflow-y-auto   max-h-[calc(100vh)] ">
        {courseContentenrolled?.content.map((section) => {
          id++;
          return (
            <div key={section._id} className="w-full ">
              <button
                onClick={() => toggleSection(section._id)}
                className="w-full flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 transition-colors duration-300"
                aria-expanded={expandedSections[section._id]}
              >
                <div className="flex items-start">
                  <span className="font-medium text-[18px] text-gray-800">
                    {id}: {section.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {section.duration}
                  </span>
                  <div
                    className={`transform transition-transform duration-300 ${
                      expandedSections[section._id] ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections[section._id] ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="bg-gray-50 border-t border-gray-100">
                  {section.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (lesson.lessonType === "quiz") {
                          navigate(
                            `/courses/${courseContentenrolled._id}/quiz/${lesson._id}`
                          );
                        } else {
                          setSelectedLesson(lesson);
                        }
                      }}
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 mr-3">
                          <Play size={14} className="text-blue-600 ml-0.5" />
                        </div>
                        <span className="text-[15px] text-gray-700">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-600 h-1.5 rounded-full w-1/5"></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">20% complete</p>
      </div>
    </div>
  );
}
function CourseComponent({ courseContentenrolled, selectedLesson, user }) {
  const [activeTab, setActiveTab] = useState("عن الكورس");
  const tabs = ["عن الكورس", "روابط وملاحظات", "التقييمات", "عن مقدم الكورس"];
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const watchedLessonIfExist =
    user.watchedLessons && selectedLesson
      ? user?.watchedLessons?.filter((wl) => {
          return wl.lessonId == selectedLesson._id;
        })[0]
      : null;
  const lastDate = watchedLessonIfExist
    ? watchedLessonIfExist?.sessions[watchedLessonIfExist?.sessions.length - 1]
        .At
    : 0; //get the  date of last session !
  // console.log(lastDate, "lastDate");
  // playback control api system

  let watchedSeconds = 0;
  let lastUpdate = 0;
  let sentCheckpoints = [];

  // check points من 5% لحد 100%
  const checkpoints = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  // Clean up player on unmount or lesson change
  const cleanupPlayer = () => {
    if (playerRef.current) {
      try {
        // Remove all event listeners if the API supports it
        playerRef.current.off?.();
        playerRef.current = null;
      } catch (error) {
        console.warn("Error cleaning up player:", error);
        playerRef.current = null;
      }
    }
  };

  // 1) Load player.js script ONCE
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="playerjs"]');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Player.js script loaded");
      setScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("❌ Failed to load Player.js script");
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove the script on unmount as it might be used by other components
      cleanupPlayer();
    };
  }, []);

  // 2) Initialize player when both script and iframe are ready
  useEffect(() => {
    if (!scriptLoaded || !iframeLoaded || !iframeRef.current) {
      return;
    }

    // Clean up previous player instance
    cleanupPlayer();

    // Small delay to ensure iframe is fully rendered
    const timer = setTimeout(() => {
      if (window.playerjs && iframeRef.current && !playerRef.current) {
        try {
          const player = new window.playerjs.Player(iframeRef.current);
          playerRef.current = player;

          player.on("timeupdate", () => {
            player.getCurrentTime(
              (value) => (window.playerCurrentTime = value)
            );
            player.getDuration((value) => {
              window.playerDuration = value;
            });
            // console.log(window.playerDuration);
            // console.log(window.playerCurrentTime);
            // console.log(duration, currentTime);

            // ✅ عداد الوقت الفعلي
            const now = Date.now();
            if (lastUpdate) {
              const diff = (now - lastUpdate) / 1000;
              // if (!player.paused()) {
              watchedSeconds += diff;
              // console.log(watchedSeconds);
              // }
            }
            lastUpdate = now;

            // ✅ checkpoints
            const percentage = (
              (window.playerCurrentTime / window.playerDuration) *
              100
            ).toFixed(2);

            checkpoints.forEach((cp) => {
              if (
                percentage <= cp + 0.01 &&
                percentage >= cp - 0.01 &&
                !sentCheckpoints.includes(cp)
              ) {
                sentCheckpoints.push(cp);

                const checkpointsTobeSented = [5, 10, 20, 40, 50, 70, 80, 90];

                const now = new Date();
                const diffMs = lastDate
                  ? now.getTime() - new Date(lastDate).getTime()
                  : 0;
                const diffHours = diffMs / (1000 * 60 * 60);

                // console.log("percentage", percentage, "cp", cp);
                console.log(diffHours, "timeDiff");

                if (checkpointsTobeSented.includes(cp)) {
                  console.log(diffHours);

                  try {
                    axios
                      .patch(
                        `${import.meta.env.VITE_API_URL}/checkpoint`,
                        {
                          lessonId: selectedLesson._id,
                          timeDiff: diffHours,
                          checkpointArray: sentCheckpoints,
                          lessonName: selectedLesson.title,
                        },
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        // console.log(res)
                      })
                      .catch((error) => console.error(error));
                  } catch (error) {
                    console.error(error);
                  }
                }
              }
            });
          });

          player.on("error", (error) => {
            console.error("❌ Player error:", error);
          });
        } catch (error) {
          console.error("❌ Error initializing player:", error);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [scriptLoaded, iframeLoaded, selectedLesson?.url]);

  // Handle iframe load
  const handleIframeLoad = () => {
    // console.log("📺 Iframe loaded");
    setIframeLoaded(true);
  };

  // Reset iframe loaded state when URL changes
  useEffect(() => {
    setIframeLoaded(false);
    cleanupPlayer();
  }, [selectedLesson?.url]);

  // Cleanup on unmount when component is destroyed (unamouny)
  useEffect(() => {
    return () => {
      cleanupPlayer();
    };
  }, []);

  return (
    <div className="bg-gray-100 md:min-h-screen flex items-start justify-center p-4 pt-1 w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full h-full">
        {/* Video Player */}
        <div className="relative w-full">
          <div className="bg-gray-200 aspect-video relative">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {selectedLesson?.url ? (
                <iframe
                  ref={iframeRef}
                  src={selectedLesson.url}
                  onLoad={handleIframeLoad}
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Video Player"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No video selected
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Navigation tabs */}
        <div className="border-b flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium cursor-pointer ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Content section */}
        <div className="p-6 max-h-full">
          {activeTab === "عن الكورس" && (
            <div>
              <h2 className="text-lg font-semibold mb-3">عن الكورس</h2>
              <p className="text-gray-700 mb-4 text-sm">
                {courseContentenrolled?.description || "لا يوجد وصف للكورس"}
              </p>
            </div>
          )}

          {activeTab === "روابط وملاحظات" && (
            <div className="text-center py-8">
              <p>ستظهر هنا الروابط المهمة</p>
            </div>
          )}

          {activeTab === "التقييمات" && (
            <div className="text-center py-8">
              <p>Student reviews would appear here</p>
            </div>
          )}

          {activeTab === "عن مقدم الكورس" && (
            <div className="text-center py-8">
              <p>مقدم الكورس م/ محمد شريف</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function YouTubePlayerComponent({
  courseContentenrolled,
  selectedLesson,
  user,
}) {
  const [activeTab, setActiveTab] = useState("عن الكورس");
  const tabs = ["عن الكورس", "روابط وملاحظات", "التقييمات", "عن مقدم الكورس"];
  const playerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const progressIntervalRef = useRef(null);
  const watchedLessonIfExist =
    user.watchedLessons && selectedLesson
      ? user?.watchedLessons?.filter((wl) => {
          return wl.lessonId == selectedLesson._id;
        })[0]
      : null;
  const lastDate = watchedLessonIfExist
    ? watchedLessonIfExist?.sessions[watchedLessonIfExist?.sessions.length - 1]
        .At
    : 0; //get the  date of last session !
  // Progress tracking variables
  let watchedSeconds = 0;
  let lastUpdate = 0;
  let sentCheckpoints = [];

  // Checkpoints from 5% to 100%
  const checkpoints = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  // Extract YouTube video ID
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  // Clean up player on unmount or lesson change
  const cleanupPlayer = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (playerRef.current && playerRef.current.destroy) {
      try {
        playerRef.current.destroy();
        playerRef.current = null;
      } catch (error) {
        console.warn("Error cleaning up YouTube player:", error);
        playerRef.current = null;
      }
    }
    setPlayerReady(false);
  };

  // 1) Load YouTube API script ONCE
  useEffect(() => {
    // Check if script already exists or API is already loaded
    if (window.YT && window.YT.Player) {
      setScriptLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="youtube.com/iframe_api"]'
    );
    if (existingScript) {
      // Script exists but might not be loaded yet, wait for it
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          setScriptLoaded(true);
          clearInterval(checkYT);
        }
      }, 100);
      return () => clearInterval(checkYT);
    }

    // Load YouTube API
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    // YouTube API requires global callback
    window.onYouTubeIframeAPIReady = () => {
      // console.log("✅ YouTube API loaded");
      setScriptLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      cleanupPlayer();
    };
  }, []);

  // 2) Initialize YouTube player when script is ready
  useEffect(() => {
    if (!scriptLoaded || !selectedLesson?.url) {
      return;
    }

    const videoId = extractYouTubeId(selectedLesson.url);
    if (!videoId) {
      console.error("❌ Invalid YouTube URL:", selectedLesson.url);
      return;
    }

    // Clean up previous player instance
    cleanupPlayer();

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        try {
          const player = new window.YT.Player("youtube-player", {
            videoId: videoId,
            playerVars: {
              autoplay: 0,
              controls: 1,
              rel: 0,
              modestbranding: 1,
            },
            events: {
              onReady: (event) => {
                playerRef.current = event.target;
                setPlayerReady(true);
              },
              onStateChange: (event) => {
                handleStateChange(event);
              },
              onError: (error) => {
                console.error("❌ YouTube Player error:", error);
              },
            },
          });
        } catch (error) {
          console.error("❌ Error initializing YouTube player:", error);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [scriptLoaded, selectedLesson?.url]);

  // Handle YouTube player state changes
  const handleStateChange = (event) => {
    const state = event.data;

    if (state === window.YT.PlayerState.PLAYING) {
      // console.log("▶️ YouTube Playing");
      startProgressTracking();
    } else if (state === window.YT.PlayerState.PAUSED) {
      // console.log("⏸️ YouTube Paused");
      stopProgressTracking();
    } else if (state === window.YT.PlayerState.ENDED) {
      // console.log("🏁 YouTube Video ended");
      stopProgressTracking();
    }
  };

  // Start progress tracking
  const startProgressTracking = () => {
    if (progressIntervalRef.current) return; // Already tracking

    progressIntervalRef.current = setInterval(() => {
      if (
        playerRef.current &&
        playerRef.current.getCurrentTime &&
        playerRef.current.getDuration
      ) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();

          if (duration > 0) {
            // Store in window for debugging (like your original code)
            window.playerCurrentTime = currentTime;
            window.playerDuration = duration;

            // ✅ Track actual watched time
            const now = Date.now();
            if (lastUpdate) {
              const diff = (now - lastUpdate) / 1000;
              watchedSeconds += diff;
            }
            lastUpdate = now;

            // ✅ checkpoints
            const percentage = (
              (window.playerCurrentTime / window.playerDuration) *
              100
            ).toFixed(2);
            // console.log(percentage);

            checkpoints.forEach((cp) => {
              if (
                percentage <= cp + 0.01 &&
                percentage >= cp - 0.01 &&
                !sentCheckpoints.includes(cp)
              ) {
                // console.log(cp);
                sentCheckpoints.push(cp);

                const checkpointsTobeSented = [5, 10, 20, 40, 50, 70, 80, 90];

                const now = new Date();
                const diffMs = lastDate
                  ? now.getTime() - new Date(lastDate).getTime()
                  : 0;
                const diffHours = diffMs / (1000 * 60 * 60);

                if (checkpointsTobeSented.includes(cp)) {
                  try {
                    axios
                      .patch(
                        `${import.meta.env.VITE_API_URL}/checkpoint`,
                        {
                          lessonId: selectedLesson._id,
                          timeDiff: diffHours,
                          checkpointArray: sentCheckpoints,
                          lessonName: selectedLesson.title,
                        },
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        // console.log(res)
                      })
                      .catch((error) => console.error(error));
                  } catch (error) {
                    console.error(error);
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error("Error tracking progress:", error);
        }
      }
    }, 1000); // Update every 2 second
  };

  // Stop progress tracking
  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Reset progress when lesson changes
  useEffect(() => {
    // Reset tracking variables
    watchedSeconds = 0;
    lastUpdate = 0;
    sentCheckpoints = [];
    cleanupPlayer();
  }, [selectedLesson?.url]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupPlayer();
    };
  }, []);

  return (
    <div className="bg-gray-100 md:min-h-screen flex items-start justify-center p-4 pt-1 w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full h-full">
        {/* Video Player */}
        <div className="relative w-full">
          <div className="bg-gray-200 aspect-video relative">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {selectedLesson?.url ? (
                <div
                  id="youtube-player"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No video selected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium cursor-pointer ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content section */}
        <div className="p-6 max-h-full">
          {activeTab === "عن الكورس" && (
            <div>
              <h2 className="text-lg font-semibold mb-3">عن الكورس</h2>
              <p className="text-gray-700 mb-4 text-sm">
                {courseContentenrolled?.description || "لا يوجد وصف للكورس"}
              </p>
            </div>
          )}

          {activeTab === "روابط وملاحظات" && (
            <div className="text-center py-8">
              <p>ستظهر هنا الروابط المهمة</p>
            </div>
          )}

          {activeTab === "التقييمات" && (
            <div className="text-center py-8">
              <p>Student reviews would appear here</p>
            </div>
          )}

          {activeTab === "عن مقدم الكورس" && (
            <div className="text-center py-8">
              <p>مقدم الكورس م/ محمد شريف</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
