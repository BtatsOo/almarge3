import { Clock, Copy, ExternalLink } from "lucide-react";
import { useEnrolledCourses } from "../helpers/useauth";
import { LoadingComponent } from "./Loading";
import { Link } from "react-router";

function MyCourses() {
  const { data, isLoading, isError } = useEnrolledCourses();
  console.log(data);
  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="grid grid-cols-1 scale-[0.9] md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.enrolledCourses.map((course) => {
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
                  className="relative h-48 bg-cover bg-no-repeat bg-gradient-to-br from-blue-50 to-indigo-100"
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
                      الدخول للكورس !
                    </Link>
                    {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Copy className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
