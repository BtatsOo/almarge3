import { useQuery } from "@tanstack/react-query";
import {
  enrolledCoursesFn,
  fetchCourseDataEnrollment,
  fetchData,
  isAuthenticated,
} from "./auth";
import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: isAuthenticated, //query fn should return promise !!
  });
  const user = data?.data?.user;
  const auth = !!user;
  return { user, auth, isLoading };
};

export const useCourses = () => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchData,
  });
  return { data, isLoading, isError };
};

export const useEnroll = (id, onSuccessCallBack, lessonId = undefined) => {
  const {
    data: { data } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coursesenroll"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses/enroll/${id}${
            lessonId ? `?lessonid=${lessonId}` : ""
          }`,
          {
            withCredentials: true,
          }
        );
        // console.log("res", res);
        // if(res)

        return res;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    onSuccess: onSuccessCallBack,
    retry: 0,
  });
  return { data, isLoading, isError, error };
};

export const useEnrolledCourses = () => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["enrolledcourses"],
    queryFn: enrolledCoursesFn,
  });
  return { data, isLoading, isError };
};

export const useEnrolledQuiz = (id, lessonId) => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["enrolledQuiz"],
    queryFn: async function () {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/courses/enroll/${id}/quiz/enroll/${lessonId}`,
          {
            withCredentials: true,
          }
        );

        return res;
        // console.log("quizLesson", quizLesson);
        // console.log(res.data);
      } catch (error) {
        // console.log(error.response?.data.message);
      }
    },
    staleTime: 1000 * 60 * 60, //1hour !
  });
  return { data, isLoading, isError };
};
export const useQuizResults = () => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quizresults"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses/myquiz/results`,
          { withCredentials: true }
        );
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return { data, isLoading, isError };
};
