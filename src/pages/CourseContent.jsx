import { useEffect, useState } from "react";
import { ChevronDown, Play, Clock, Users, Star } from "lucide-react";
import { useAuth, useEnroll } from "../helpers/useauth";
import { useNavigate, useParams } from "react-router";
import { LoadingComponent } from "./Loading";
const courseInfo = {
  title: "Figma from A to Z",
  category: "UI / UX Design",
  lessons: 38,
  duration: "4h 30min",
  rating: 4.9,
  reviews: 126,
  description: [
    "Unlock the power of Figma, the leading collaborative design tool, with our comprehensive online course. Whether you're a novice or looking to enhance your skills, this course will guide you through Figma's robust features and workflows.",
    "Perfect for UI/UX designers, product managers, and anyone interested in modern design tools. Join us to elevate your design skills and boost your productivity with Figma!",
  ],
  learningPoints: [
    "Setting up the environment",
    "Advanced HTML Practices",
    "Build a portfolio website",
    "Responsive Design",
    "Understand HTML Programming",
    "Code HTML",
    "Start building beautiful websites",
  ],
};

function CourseContent() {
  // check auth
  // const { data: { data } = {}, isLoading } = useAuth();
  const { id } = useParams();
  const { data: { courseContentenrolled } = {}, isLoading } = useEnroll(id);
  console.log(courseContentenrolled);
  // const {}

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
        {courseContentenrolled || selectedLesson ? (
          <>
            <CourseComponent
              courseContentenrolled={courseContentenrolled}
              selectedLesson={selectedLesson}
            />
            <CourseList
              courseContentenrolled={courseContentenrolled}
              setSelectedLesson={setSelectedLesson}
            />
          </>
        ) : (
          <div>You dont have access to get to this course !</div>
        )}
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
      console.log(section._id);
      initialState[section._id] = section._id === "6867ddf313f7e7d75507f2ed"; // Only first section is true (01:true) and  expanded by default
    });
    return initialState;
  };
  useEffect(() => {
    const initialState = initializeExpandedState(
      courseContentenrolled?.content
    );
    console.log(initialState);
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
function CourseComponent({ courseContentenrolled, selectedLesson }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["عن الكورس", "روابط وملاحظات", "التقييمات", "عن مقدم الكورس"];

  return (
    <div className="bg-gray-100 md:min-h-screen flex items-start justify-center p-4 pt-1 w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full h-full">
        {/* Header with back button and title */}

        {/* Video thumbnail */}
        <div className="relative w-[100%]">
          <div className="bg-gray-200 aspect-video relative">
            {/* Video thumbnail */}
            <div className="relative w-full">
              <div className="bg-gray-200 aspect-video relative">
                <div className="relative w-full aspect-video">
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                      src={selectedLesson?.url}
                      loading="lazy"
                      style={{
                        border: 0,
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        width: "100%",
                      }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
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
              <h2 className="text-lg  font-semibold  mb-3">عن الكورس</h2>
              {/* {courseInfo.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 text-sm">
                  {paragraph}
                </p>
              ))} */}
              <p className="text-gray-700 mb-4 text-sm">
                {courseContentenrolled.description}
              </p>

              {/* <h2 className="text-lg font-semibold mt-6 mb-4">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {courseInfo.learningPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div> */}
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
