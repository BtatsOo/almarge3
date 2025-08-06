import React, { useState } from "react";
import {
  Clock,
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useCourses } from "../helpers/useauth";
import { Link } from "react-router";
const categories = [{ id: "Math", name: "الرياضيات", icon: BookOpen }];
const Browse = () => {
  const { data, isLoading, isError } = useCourses();

  // const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("Math");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">الكورسات</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">الكل</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((course) => {
              // const { providerColor, buttonColor } = getProviderColors(
              //   course.provider
              // );
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Course Image */}
                  <div
                    className="relative h-[380px] bg-cover bg-no-repeat bg-gradient-to-br from-blue-50 to-indigo-100"
                    style={{ backgroundImage: `url(${course.featuredImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-gray-700">
                        {course.duration}
                      </span>
                    </div>
                    {/* Placeholder for actual course image */}
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex flex-col h-[60%] ">
                    {/* Provider Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {course.provider}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {course.description.slice(0, 120)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center mt-auto gap-3 mb-2">
                      <Link
                        to={`/courses/${course._id}`}
                        className={`flex-1 text-center bg-blue-950 py-2 cursor-pointer text-white font-medium rounded-lg transition-colors `}
                      >
                        اشتري الان
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Copy className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {data?.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No courses available
              </h3>
              <p className="text-gray-500">
                Check back later for new courses in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
// const courses = {
//   "IT courses": [
//     {
//       id: 1,
//       title: "UI/UX DESIGNER",
//       provider: "Skillbox",
//       duration: "5m 24m",
//       description:
//         "They act like professional spies, discovering everything that worries the user and solv...",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-blue-500",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//     },
//     {
//       id: 2,
//       title: "FULLSTACK DEVELOPER",
//       provider: "Mate Academy",
//       duration: "12h",
//       description:
//         "Companies value such specialists highly, as they can implement a new feature comp...",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-orange-500",
//       buttonColor: "bg-orange-500 hover:bg-orange-600",
//     },
//     {
//       id: 3,
//       title: "QA ENGINEER",
//       provider: "QA IT",
//       duration: "3m 6m",
//       description:
//         "They design testing scenarios for applications, websites, and software.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-blue-400",
//       buttonColor: "bg-blue-400 hover:bg-blue-500",
//     },
//     {
//       id: 4,
//       title: "JAVA DEVELOPMENT",
//       provider: "Mate Academy",
//       duration: "9m",
//       description:
//         "Master Java programming from fundamentals to advanced enterprise applications.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-orange-500",
//       buttonColor: "bg-orange-500 hover:bg-orange-600",
//     },
//     {
//       id: 5,
//       title: "UI/UX DESIGNER",
//       provider: "UP_Rock",
//       duration: "4m 8m",
//       description:
//         "Learn modern design principles and create beautiful user experiences.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-gray-700",
//       buttonColor: "bg-gray-700 hover:bg-gray-800",
//     },
//     {
//       id: 6,
//       title: "PROJECT MANAGER",
//       provider: "Skillbox",
//       duration: "3m 5m",
//       description:
//         "Lead teams and deliver successful projects using modern methodologies.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-blue-500",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//     },
//   ],
//   Languages: [
//     {
//       id: 7,
//       title: "ENGLISH CONVERSATION",
//       provider: "Language Pro",
//       duration: "6m",
//       description:
//         "Improve your English speaking skills through interactive conversations.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-green-500",
//       buttonColor: "bg-green-500 hover:bg-green-600",
//     },
//     {
//       id: 8,
//       title: "SPANISH BASICS",
//       provider: "Lingoda",
//       duration: "4m",
//       description:
//         "Start your Spanish journey with essential vocabulary and grammar.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-red-500",
//       buttonColor: "bg-red-500 hover:bg-red-600",
//     },
//   ],
//   Business: [
//     {
//       id: 9,
//       title: "DIGITAL MARKETING",
//       provider: "Business Academy",
//       duration: "8m",
//       description:
//         "Master digital marketing strategies and grow your online presence.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-purple-500",
//       buttonColor: "bg-purple-500 hover:bg-purple-600",
//     },
//   ],
//   Sports: [
//     {
//       id: 10,
//       title: "FITNESS TRAINING",
//       provider: "FitPro",
//       duration: "12w",
//       description:
//         "Complete fitness program for beginners and intermediate athletes.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-green-600",
//       buttonColor: "bg-green-600 hover:bg-green-700",
//     },
//   ],
//   "School items": [
//     {
//       id: 11,
//       title: "MATHEMATICS BASICS",
//       provider: "EduTech",
//       duration: "6m",
//       description:
//         "Strengthen your mathematical foundation with interactive lessons.",
//       image: "/api/placeholder/280/180",
//       providerColor: "bg-indigo-500",
//       buttonColor: "bg-indigo-500 hover:bg-indigo-600",
//     },
//   ],
// };
// const categories = [
//   { id: "IT courses", name: "IT courses", icon: BookOpen },
//   { id: "Languages", name: "Languages", icon: Users },
//   { id: "Business", name: "Business", icon: Trophy },
//   { id: "Sports", name: "Sports", icon: Trophy },
//   { id: "School items", name: "School items", icon: GraduationCap },
// ];
// const activeCourses = courses[activeCategory] || [];
// const getProviderColors = (provider) => {
//   const colorMap = {
//     Skillbox: {
//       providerColor: "bg-blue-500",
//       buttonColor: "bg-blue-500 hover:bg-blue-600",
//     },
//     "Mate Academy": {
//       providerColor: "bg-orange-500",
//       buttonColor: "bg-orange-500 hover:bg-orange-600",
//     },
//     "QA IT": {
//       providerColor: "bg-blue-400",
//       buttonColor: "bg-blue-400 hover:bg-blue-500",
//     },
//     UP_Rock: {
//       providerColor: "bg-gray-700",
//       buttonColor: "bg-gray-700 hover:bg-gray-800",
//     },
//     "Language Pro": {
//       providerColor: "bg-green-500",
//       buttonColor: "bg-green-500 hover:bg-green-600",
//     },
//     Lingoda: {
//       providerColor: "bg-red-500",
//       buttonColor: "bg-red-500 hover:bg-red-600",
//     },
//     "Business Academy": {
//       providerColor: "bg-purple-500",
//       buttonColor: "bg-purple-500 hover:bg-purple-600",
//     },
//     FitPro: {
//       providerColor: "bg-green-600",
//       buttonColor: "bg-green-600 hover:bg-green-700",
//     },
//     EduTech: {
//       providerColor: "bg-indigo-500",
//       buttonColor: "bg-indigo-500 hover:bg-indigo-600",
//     },
//   };

//   // Default if provider not found
//   return (
//     colorMap[provider] || {
//       providerColor: "bg-gray-400",
//       buttonColor: "bg-gray-400 hover:bg-gray-500",
//     }
//   );
// };
