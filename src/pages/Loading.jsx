import React from "react";

export const LoadingComponent = ({
  message = "Loading...",
  size = "md",
  overlay = false,
  color = "blue",
}) => {
  // Size variants
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-18 h-18",
    xl: "w-20 h-20",
  };

  // Color variants
  const colorClasses = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    pink: "border-pink-500",
  };

  const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`;

  // Overlay version
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 max-w-sm mx-4">
          <div className={spinnerClass}></div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">{message}</p>
            <div className="flex space-x-1 mt-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular version
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative">
        <div className={spinnerClass}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-2 h-2 ${colorClasses[color].replace(
              "border-",
              "bg-"
            )} rounded-full animate-ping`}
          ></div>
        </div>
      </div>
      <div className="text-center space-y-3">
        <p className="text-lg font-medium text-gray-700">{message}</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
