import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Target,
  BookOpen,
  Calendar,
  Award,
} from "lucide-react";

import { useQuizResults } from "../helpers/useauth";
import { LoadingComponent } from "./Loading";

export const Result = () => {
  const { data, isLoading, isError } = useQuizResults();
  console.log(data);
  // Mock data based on my exact structure

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (score) => {
    return score >= 70
      ? "text-green-600"
      : score >= 50
      ? "text-yellow-600"
      : "text-red-600";
  };

  const getStatusBg = (score) => {
    return score >= 70
      ? "bg-green-50 border-green-200"
      : score >= 50
      ? "bg-yellow-50 border-yellow-200"
      : "bg-red-50 border-red-200";
  };

  const getProgressColor = (score) => {
    return score >= 70
      ? "bg-green-500"
      : score >= 50
      ? "bg-yellow-500"
      : "bg-red-500";
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return "ممتاز";
    if (score >= 80) return "جيد جداً";
    if (score >= 70) return "جيد";
    if (score >= 50) return "مقبول";
    return "راسب";
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                نتائج الاختبارات
              </h1>
              <p className="text-gray-600">
                عرض نتائج جميع الاختبارات التي أجريتها
              </p>
            </div>

            {/* Quiz Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {data.map((quiz) => (
                <div
                  key={quiz._id}
                  className={`bg-white rounded-lg shadow-md border-2 ${getStatusBg(
                    quiz.score
                  )} hover:shadow-lg transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {quiz.courseTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {quiz.lessonTitle}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(
                          quiz.score
                        )} ${getStatusColor(quiz.score)}`}
                      >
                        {getScoreLevel(quiz.score)}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(quiz.createdAt)}
                    </div>
                  </div>

                  {/* Score Section */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          النتيجة النهائية
                        </span>
                        <span
                          className={`text-2xl font-bold ${getStatusColor(
                            quiz.score
                          )}`}
                        >
                          {quiz.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getProgressColor(
                            quiz.score
                          )} transition-all duration-500`}
                          style={{ width: `${quiz.score}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Results Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-600">
                          {quiz.correctAnswers}
                        </div>
                        <div className="text-xs text-green-700">صحيحة</div>
                      </div>

                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-red-600">
                          {quiz.wrongAnswers}
                        </div>
                        <div className="text-xs text-red-700">خاطئة</div>
                      </div>

                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-600">
                          {quiz.totalQuestions}
                        </div>
                        <div className="text-xs text-blue-700">المجموع</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Award className="w-5 h-5 text-yellow-500 mr-2" />
                  إحصائيات عامة
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {data.length}
                    </div>
                    <div className="text-sm text-blue-700">
                      إجمالي الاختبارات
                    </div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {data.filter((q) => q.score >= 70).length}
                    </div>
                    <div className="text-sm text-green-700">اختبارات ناجحة</div>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {data.filter((q) => q.score < 70).length}
                    </div>
                    <div className="text-sm text-red-700">اختبارات راسبة</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(
                        data.reduce((acc, q) => acc + q.score, 0) / data.length
                      )}
                      %
                    </div>
                    <div className="text-sm text-purple-700">متوسط النتائج</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
