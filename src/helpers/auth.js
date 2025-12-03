// src/auth.js

import axios from "axios";

// funtcion to add lessons and topic (control panel)

export const editCourses = async (formData, action, numLessons) => {
  const { topicId, courseData, newTopicTitle } = formData;
  if (action === "addTopic") {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/update-course/${
          courseData._id
        }`,
        {
          action: "addTopic",

          data: {
            title: newTopicTitle,
            description: " ",
            lessons: numLessons.map((lesson, index) => {
              const iframeString = lesson[`newLessonUrl${index + 1}`];

              // Extract the URL using regex
              const match = iframeString.match(/src="([^"]+)"/);
              let cleanUrl = "";

              if (match && match[1]) {
                // Get the part before '?'
                cleanUrl = match[1].split("?")[0];
              }
              console.log(cleanUrl);
              const filteredLessonUrl = lesson[
                `newLessonUrl${index + 1}`
              ]?.includes("<iframe")
                ? cleanUrl
                : lesson[`newLessonUrl${index + 1}`];
              return {
                url: filteredLessonUrl,
                title: lesson[`newLessonName${index + 1}`],
                duration: "0",
                lessonType: "lesson",
                questions: [],
                docs: {},
              };
            }),
          },
        },
        {
          withCredentials: true,
        }
      );

      // console.log(res, "Data");
      // localStorage.setItem("token", { data }); // Store token in local storage

      return res;
    } catch (error) {
      console.error("Authentication error:", error.response.data);
      throw error.response.data;
    }
  } else if (action === "addLesson") {
    const iframeString = formData.newLessonUrl1;

    // Extract the URL using regex
    const match = iframeString.match(/src="([^"]+)"/);
    let cleanUrl = "";

    if (match && match[1]) {
      // Get the part before '?'
      cleanUrl = match[1].split("?")[0];
    }
    const filteredLessonUrlForTopic = formData.newLessonUrl1?.includes(
      "<iframe"
    )
      ? cleanUrl
      : formData.newLessonUrl1;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/update-course/${
          courseData._id
        }`,
        {
          action: "addLesson",
          topicId: topicId,
          data: {
            url: filteredLessonUrlForTopic,
            title: formData.newLessonName1,
            duration: "0",
            lessonType: "lesson",
            questions: [],
            docs: {},
          },
        },
        {
          withCredentials: true,
        }
      );

      // console.log(res, "Data");
      // localStorage.setItem("token", { data }); // Store token in local storage

      return res;
    } catch (error) {
      console.error("Authentication error:", error.response.data);
      throw error.response.data;
    }
  }
};
// Function to authenticate user
export const authenticateUser = async (name, password) => {
  try {
    //  `${process.env.REACT_APP_SERVER_URL}/login`,
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        name,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { data } = res;
    console.log(data);
    // localStorage.setItem("token", { data }); // Store token in local storage

    return data;
  } catch (error) {
    console.error("Authentication error:", error.response.data);
    throw error.response.data;
  }
};
export const createUser = async (
  name,
  password,
  email,
  phoneNumber,
  city,
  guardianPhone,
  class1
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        name,
        password,
        email,
        phoneNumber,
        guardianPhone,
        city,
        class1,
      },
      {
        withCredentials: true,
      }
    );

    const data = res;
    console.log(data);

    // localStorage.setItem("token", { data }); // Store token in local storage

    return data;
  } catch (error) {
    console.error("Error Creating User :", error.response.data);
    throw error.response.data;
  }
};

// // Function to check if user is authenticated from front end
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return token != null;
// };
// in backend (cookies)
export const isAuthenticated = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/login`, {
      withCredentials: true,
    });

    // const { data } = res;

    return res;
  } catch (err) {
    // in axios when its err it returns err
    return err;
  }
};

export const logOut = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    });
    console.log(res);

    return res;
  } catch (err) {
    return err;
  }
};

// // Function to get JWT token
// export const getToken = () => {
//   return localStorage.getItem("token");
// };
//  fetch courses data
export const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch course data enrollment

export const fetchCourseDataEnrollment = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/courses/enroll/${id}`,
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const enrolledCoursesFn = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/courses/enrolled-courses`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// fetch quiz data !
// export async function fetchQuizData
