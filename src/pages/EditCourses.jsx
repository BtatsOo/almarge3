import React, { useEffect, useState } from "react";
import { useAuth, useEnrolledCourses } from "../helpers/useauth";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { editCourses } from "../helpers/auth";
function EditCourses() {
  const { user = {}, auth } = useAuth();
  // هخلي الكورسات اللي تظهر اللي الادمن شاريها عندده وهعدل عليها بعدين (الكورسات كلها بالمحتوى  بتاعها المفروض يظهر للادمن بدون شروط )
  const [numLessons, setNumLessons] = useState([""]);
  console.log(numLessons);
  const { data, isLoading, isError } = useEnrolledCourses();

  const [formData, setFormData] = useState({
    courseId: "",
    topicId: "",

    newTopicTitle: "",
    courseData: {},
  });

  const handleInputChange = (e) => {
    // console.log(e.target.name === "password");
    // console.log(/\s/.test(e.target.value));

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const saveChanges = async (e) => {
    e.preventDefault();
    // make lessons in array of objects

    try {
      const token = await editCourses(
        formData,
        formData.topicId === "" ? "addTopic" : "addLesson",
        numLessons
      );
      if (token) {
        console.log(token);
      }
    } catch (error1) {
      console.log(error1);
    }
  };
  console.log(formData);
  function getCoursesData(courseId) {
    console.log("courseId", courseId);
    const courseData = data.enrolledCourses.filter((crs) => {
      return crs._id === courseId;
    });
    // console.log("courseData", ...courseData);
    setFormData({
      ...formData,
      ["courseData"]: courseData[0],
    });
  }
  console.log(data);
  console.log(formData);
  return (
    <>
      {user?.name === "admin" && data?.enrolledCourses.length ? (
        <div className="p-10">
          <h1>رفع وتعديل الفيديوهات </h1>
          {/* اضافة الفيديوهات  */}

          {/* Courses Selection */}
          <form
            onSubmit={(e) => {
              saveChanges(e);
            }}
          >
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الكورسات
              </label>
              <div className="relative">
                <GraduationCap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                <select
                  name="courseId"
                  onChange={handleInputChange}
                  onClick={() => {
                    getCoursesData(formData.courseId);
                  }}
                  required
                  className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right appearance-none cursor-pointer text-sm sm:text-base hover:border-gray-300"
                >
                  <option value={""}>الكورسات</option>
                  {data.enrolledCourses.map((crs) => (
                    <option key={crs._id} value={crs._id}>
                      {crs.title}
                      {crs?.title?.includes("تانية ثانوي") ||
                      crs?.title?.includes("ثانية ثانوي")
                        ? " 2️⃣"
                        : ""}
                      {crs?.title.includes("رياض") ? "📐" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
            {formData.courseId && (
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  المواضيع
                </label>
                <div className="relative">
                  <GraduationCap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                  <select
                    name="topicId"
                    onChange={handleInputChange}
                    required
                    className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right appearance-none cursor-pointer text-sm sm:text-base hover:border-gray-300"
                  >
                    <option>المواضيع</option>
                    {formData?.courseData?._id
                      ? formData?.courseData?.content.map((topic) => {
                          return (
                            <option key={topic._id} value={topic._id}>
                              {topic.title}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                  </div>
                </div>
                {/* اضافة موضوع + دروس في الموضوع */}
                {!formData?.topicId && (
                  <>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        اضافة موضوع جديد
                      </label>
                      <div className="relative">
                        <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                        <input
                          type="text"
                          name="newTopicTitle"
                          onChange={handleInputChange}
                          className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                          placeholder="مثال : الحصة الثامنة"
                          required
                        />
                      </div>
                    </div>
                    {numLessons.map((lesson, index) => {
                      return (
                        <div key={index} className="relative">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            اضافة درس جديد {index + 1}
                          </label>
                          <div className="relative mb-5 ">
                            <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                            <input
                              key={index}
                              type="text"
                              name={`newLessonName${index + 1}`}
                              onChange={(e) => {
                                handleInputChange(e);
                                setNumLessons((prev) =>
                                  prev.map((lesson, i) =>
                                    i === index
                                      ? {
                                          ...lesson,
                                          [e.target.name]: e.target.value,
                                        }
                                      : lesson
                                  )
                                );
                              }}
                              className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                              placeholder="مثال : شرح الحصة الثامنة"
                              required
                            />
                          </div>
                          <div className="relative">
                            <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                            <input
                              key={index}
                              type="text"
                              name={`newLessonUrl${index + 1}`}
                              onChange={(e) => {
                                handleInputChange(e);
                                setNumLessons((prev) =>
                                  prev.map((lesson, i) =>
                                    i === index
                                      ? {
                                          ...lesson,
                                          [e.target.name]: e.target.value,
                                        }
                                      : lesson
                                  )
                                );
                              }}
                              className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                              placeholder=" رابط الحصة "
                              required
                            />
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => {
                        setNumLessons((prev) => [...prev, ""]);
                      }}
                    >
                      اضافة درس جديد ➕
                    </button>
                  </>
                )}
                {formData.topicId && (
                  <>
                    {numLessons.map((lessons, index) => {
                      return (
                        <div key={index} className="relative">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            اضافة درس جديد {index + 1}
                          </label>
                          <div className="relative mb-5 ">
                            <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                            <input
                              key={index}
                              type="text"
                              name={`newLessonName${index + 1}`}
                              onChange={handleInputChange}
                              className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                              placeholder="مثال : شرح الحصة الثامنة"
                              required
                            />
                          </div>
                          <div className="relative">
                            <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                            <input
                              key={index}
                              type="text"
                              name={`newLessonUrl${index + 1}`}
                              onChange={handleInputChange}
                              className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                              placeholder=" رابط الحصة "
                              required
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* حفظ الدرس */}
                <button
                  type="submit"
                  className="border-2 border-black block mt-5"
                >
                  حفظ التعديلات
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <p className="text-sm text-red-600 mt-2 mb-0 no-underline">
          غير مسموج لهذا الحساب بالدخول للوحة التحكم
        </p>
      )}
    </>
  );
}

export default EditCourses;
