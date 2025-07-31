// import { useEffect, useRef, useState } from "react";

// function FollowUp() {
//   const canvasRef = useRef(null);
//   const [tasks, setTasks] = useState(Array(6).fill(""));
//   const [notes, setNotes] = useState("");

//   useEffect(() => {
//     drawImage();
//   }, []);
//   const drawImage = (callback) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.src = "/follow.png"; // must be in the public folder

//     img.onload = () => {
//       // Clear previous drawings
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw template image
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//       // Draw tasks
//       ctx.fillStyle = "black";
//       ctx.font = "50px JozoorFont";

//       const startX = 1225;
//       const startY = 740;
//       const lineSpacing = 113;

//       tasks.forEach((task, i) => {
//         if (task.trim()) {
//           ctx.fillText(task, startX, startY + i * lineSpacing);
//         }
//       });

//       // Draw notes (supports multiple lines)
//       const noteYStart = 1520;
//       notes.split("\n").forEach((line, i) => {
//         ctx.fillStyle = "white";
//         ctx.fillText(line, 1225, noteYStart + i * 55);
//       });

//       if (callback) callback(); // used to trigger download after drawing
//     };
//   };

//   const downloadImage = () => {
//     drawImage(() => {
//       const link = document.createElement("a");
//       link.download = "my-filled-planner.png";
//       link.href = canvasRef.current.toDataURL("image/png");
//       link.click();
//     });
//   };
//   return (
//     <div className="px-10">
//       <h2 className="text-center mt-5 mb-10 text-5xl">مخطط المهام اليومي</h2>
//       {tasks.map((task, i) => (
//         <>
//           <input
//             className="border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
//             key={i}
//             type="text"
//             placeholder={`مهمة ${i + 1}`}
//             value={task}
//             onChange={(e) => {
//               const newTasks = [...tasks];
//               newTasks[i] = e.target.value;
//               setTasks(newTasks);
//             }}
//             style={{ margin: "5px", padding: "8px", width: "300px" }}
//           />
//         </>
//       ))}
//       <textarea
//         className="border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
//         placeholder="ملاحظات"
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         rows={4}
//         style={{ width: "700px", marginTop: "10px", padding: "8px" }}
//       />
//       <div className="mx-auto flex justify-center flex-col items-center ">
//         <canvas
//           ref={canvasRef}
//           width={1414}
//           height={2000}
//           style={{
//             borderRadius: "10px",
//             border: "1px solid #aaa",
//             marginTop: "20px",
//             width: "390px",
//           }}
//         />
//         <button
//           onClick={() => drawImage()}
//           style={{ marginRight: "10px", cursor: "pointer", marginTop: "10px" }}
//         >
//           معاينة الصورة
//         </button>
//         <button
//           className=" border-teal-500 rounded-xl border-2"
//           style={{ marginRight: "40px", cursor: "pointer", marginTop: "10px" }}
//           onClick={downloadImage}
//         >
//           تحميل الصورة
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FollowUp;
import { useEffect, useRef, useState } from "react";

function FollowUp() {
  const canvasRef = useRef(null);
  const [tasks, setTasks] = useState(Array(6).fill(""));
  const [notes, setNotes] = useState("");

  useEffect(() => {
    drawImage();
  }, []);

  const drawImage = (callback) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const date = new Date();
    const fullDate = `${date.getDate()}/${date.getMonth() + 1}`;
    img.src = "/follow.png"; // must be in the public folder

    img.onload = () => {
      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw template image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw tasks
      ctx.fillStyle = "black";
      ctx.font = "50px JozoorFont";

      const startX = 1225;
      const startY = 740;
      const lineSpacing = 113;

      tasks.forEach((task, i) => {
        if (task.trim()) {
          ctx.fillText(task, startX, startY + i * lineSpacing);
        }
      });

      // Draw notes (supports multiple lines)
      const noteYStart = 1520;
      notes.split("\n").forEach((line, i) => {
        ctx.fillStyle = "white";
        ctx.fillText(line, 1225, noteYStart + i * 55);
      });
      // draw date

      ctx.fillStyle = "#3db8a9";

      ctx.fillText(fullDate, 500, 480);
      ctx.fillText(date.getDay(), 1100, 480);

      if (callback) callback(); // used to trigger download after drawing
    };
  };

  const downloadImage = () => {
    drawImage(() => {
      const link = document.createElement("a");
      link.download = "my-filled-planner.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    });
  };
  const handleNotesChange = (e) => {
    const rawValue = e.target.value;

    const lines = rawValue.split("\n"); // Preserve existing newlines

    const wrappedLines = lines.map((line) => {
      const words = line.split(" ");
      let currentLine = "";
      let result = [];

      for (let word of words) {
        if ((currentLine + word).length <= 50) {
          currentLine += (currentLine ? " " : "") + word;
        } else {
          result.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) result.push(currentLine);

      return result.join("\n");
    });

    const formatted = wrappedLines.join("\n");
    setNotes(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            مخطط المهام اليومي
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="space-y-8">
            {/* Tasks Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-right">
                المهام اليومية
              </h3>
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={i} className="relative">
                    <input
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-right text-base
                               focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none 
                               transition-all duration-300 hover:border-gray-300 hover:shadow-sm
                               placeholder-gray-400"
                      type="text"
                      placeholder={`مهمة ${i + 1}`}
                      value={task}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[i] = e.target.value;
                        setTasks(newTasks);
                      }}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full opacity-50"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-right">
                ملاحظات
              </h3>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-right text-base
                         focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none 
                         transition-all duration-300 hover:border-gray-300 hover:shadow-sm
                         placeholder-gray-400 resize-none"
                placeholder="اكتب ملاحظاتك هنا..."
                value={notes}
                onChange={handleNotesChange}
                rows={6}
              />
            </div>
          </div>

          {/* Canvas and Controls Section */}
          <div className="flex flex-col items-center space-y-6">
            {/* Canvas Container */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <canvas
                ref={canvasRef}
                width={1414}
                height={2000}
                className="max-w-full h-auto rounded-xl border-2 border-gray-100 shadow-sm"
                style={{ width: "390px" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                onClick={() => drawImage()}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                         text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 
                         transform hover:scale-105 hover:shadow-lg active:scale-95
                         focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  معاينة الصورة
                </span>
              </button>

              <button
                onClick={downloadImage}
                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 
                         text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 
                         transform hover:scale-105 hover:shadow-lg active:scale-95
                         focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  تحميل الصورة
                </span>
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 max-w-md">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">نصيحة:</p>
                  <p className="text-right">
                    اضغط على "معاينة الصورة" لرؤية التحديثات، ثم "تحميل الصورة"
                    لحفظ المخطط
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUp;
