import React, { Children, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import "../css/course.css";
import { useAuth } from "../helpers/useauth";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
function CourseOverview() {
  const [courseData, setCourseData] = useState([]);
  const [courseDataError, setCourseDataError] = useState("");
  const { user = {}, auth } = useAuth();
  const { id } = useParams();
  const [success, setIsSuccess] = useState("");
  const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
  const queryClient = useQueryClient();
  // const [auth, setAuth] = useState(false); //dont repeat your self
  const handleSuccessPay = (value) => {
    setIsSuccess(value);
  };
  const handleOpenConfirmMessage = (e) => {
    if (user?.enrolledCourses?.includes(id)) {
      window.location.href = `/courses/enroll/${id}`;
    } else {
      setOpenConfirmMessage(!openConfirmMessage);
    }
  };
  const updateUserData = (updateduser) => {
    // setUserData(updateduser);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/courses/${id}`); //fetch() function does not throw an error on HTTP errors like 404 or 500
        if (!res.ok) {
          throw new Error("Course not found");
        }

        const data = await res.json();
        console.log(data);
        setCourseData(data);
        console.log(courseData, "course data detector");
      } catch (error) {
        console.log(error);
        setCourseDataError(error.message);
        console.log("sdsd");
      }
    }
    fetchData();
  }, []);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const { user } = await isAuthenticated();
  //     console.log("user", user);
  //     if (user) {
  //       setAuth(true); // User is authenticated
  //       setUserData(user);
  //     } else {
  //       setAuth(false); // User is not authenticated
  //     }
  //     setIsLoading(false); // Loading is complete
  //   };

  //   checkAuth();
  // }, []);

  return (
    <>
      {success === true
        ? ReactDOM.createPortal(
            <div className="overlayConfrimMessage">
              <div className="confirmCard">
                <h1>تم شراء الكورس بنجاح</h1>
                <button
                  className="btn"
                  onClick={() => {
                    setIsSuccess("closeWidnow");
                  }}
                >
                  الغاء
                </button>
              </div>
            </div>,
            document.getElementById("overlay-root")
          )
        : success === false
        ? ReactDOM.createPortal(
            <div className="overlayConfrimMessage">
              <div className="confirmCard">
                <h1>رصيدك الحالي لا يكفي اشحن رصيدك وعاود الشراء مرة اخرى!</h1>
                <button
                  className="btn"
                  onClick={() => {
                    setIsSuccess("closeWidnow");
                  }}
                >
                  الغاء
                </button>
              </div>
            </div>,
            document.getElementById("overlay-root")
          )
        : ""}

      {openConfirmMessage && (
        <ConfirmMessage
          handleSuccessPay={handleSuccessPay}
          auth={auth}
          courseData={courseData}
          handleOpenConfirmMessage={handleOpenConfirmMessage}
          updateUserData={updateUserData}
        />
      )}
      {courseDataError ? (
        <div>{courseDataError}</div>
      ) : (
        <div
          className="course-container"
          style={{ flexWrap: "Wrap", padding: "70px 30px" }}
        >
          <CourseInfo courseData={courseData} />
          <Aside
            handleOpenConfirmMessage={handleOpenConfirmMessage}
            courseData={courseData}
            dataUser={user}
            id={id}
          ></Aside>
        </div>
      )}
    </>
  );
}

function CourseInfo({ courseData }) {
  return (
    <div
      className="crs-body"
      style={{
        display: "flex",
        flexDirection: "column",
        flexBasis: "60%",
        boxShadow: "#00000026 0px 0 8px 1px",
      }}
    >
      <div className="crs-page-img">
        <img src={courseData.featuredImage} />
      </div>
      <div className="crs-info" style={{ padding: "0 40px" }}>
        <div className="about-crs">
          <h1 className="title-framework">عن الكورس :</h1>
          <p>{courseData.description}</p>
        </div>
        <div className="crs-content">
          <h1 className="title-framework">محتوى الكورس : </h1>
          <Topic courseData={courseData}></Topic>
        </div>
      </div>
    </div>
  );
}
function Topic({ children, courseData }) {
  const initializeExpandedState = (sections) => {
    const initialState = {};
    sections.forEach((section) => {
      initialState[section.id] = section.id === "01"; // Only first section is true (01:true) and  expanded by default
    });
    return initialState;
  };

  const [expandedSections, setExpandedSections] = useState(() =>
    initializeExpandedState(courseData)
  );
  console.log(expandedSections);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="topics">
      {courseData.content &&
        courseData.content.map((c) => {
          return (
            <div
              key={c._id}
              className="topic"
              onClick={() => {
                toggleSection(c._id);
              }}
            >
              <div className="topic-title">
                <h1 className="title-framework">{c.title}</h1>
              </div>
              {c.lessons.map((lesson) => (
                <Lessons
                  isOpened={expandedSections[c._id]}
                  key={lesson._id}
                  lesson={lesson}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
}
function Lessons({ lesson, isOpened, children }) {
  return (
    <div className={`lessons ${isOpened ? "opened" : ""}`}>
      <h1 style={{ fontSize: "1.3rem" }} className="">
        {lesson.title}
      </h1>
      {children}
    </div>
  );
}
function Aside({ courseData, dataUser, id, handleOpenConfirmMessage }) {
  return (
    <div
      className="aside"
      style={{
        marginTop: "30px",
        flexBasis: "30%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="course-card"
        style={{ borderRadius: "12px", boxShadow: "#00000026 0px 0 8px 1px" }}
      >
        <div
          className="course-card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f4f6f9",
            padding: "1.4rem",
            fontSize: "20px",
            gap: "20px",
          }}
        >
          <span style={{ fontWeight: "bold", textAlign: "" }}>
            {courseData.price ? `${courseData.price} جنيه` : "مجاني"}
          </span>
          <button
            onClick={handleOpenConfirmMessage}
            style={{
              backgroundColor: "#3E64DE",
              border: "none",
              color: "white",
              padding: "8px",
              borderRadius: "9px",
              fontSize: "24px",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            {dataUser?.enrolledCourses?.includes(id) || !courseData.price
              ? "الدخول للكورس"
              : "اشتري الان !"}
          </button>
        </div>
        <div
          className="course-card-footer"
          style={{ position: "relative", padding: "5px" }}
        >
          <span>المدة: {courseData.duration}</span>
        </div>
      </div>
    </div>
  );
}
// confirm purhase!
function ConfirmMessage({
  courseData,
  handleOpenConfirmMessage,
  handleSuccessPay,
  auth,
  updateUserData,
  children,
}) {
  const [error, setError] = useState("");
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/courses/purchase/${courseData._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      handleSuccessPay(true);
      // setResponseMessage("Update successful!");

      console.log("Response data:", response.data);
      updateUserData(response.data);
    } catch (error) {
      // setResponseMessage("Update failed.");
      handleSuccessPay(false);
      console.log(error);

      setError(error.response.data.message);
    }
  };
  return ReactDOM.createPortal(
    // we should make it more dynamic and fill content with props
    <div className="overlayConfrimMessage">
      {auth ? (
        <div className="confirmCard">
          <MessageTitle>
            هل انت متاكد من شراء هذا الكورس : <br />
            {courseData.title}
            <br />
            سيتم خصم {courseData.price} جنيه
          </MessageTitle>
          <div>
            <MessageButton
              auth={auth}
              onClick={handleOpenConfirmMessage}
              className="btn"
            >
              الغاء
            </MessageButton>
            <MessageButton
              auth={auth}
              onClick={() => {
                handleUpdate();
                handleOpenConfirmMessage();
              }}
              className="btn"
            >
              شراء
            </MessageButton>
          </div>
        </div>
      ) : (
        <div className="confirmCard">
          <MessageTitle>تحتاج لتسجيل دخولك اولا!</MessageTitle>
          <div>
            <Link to={"/login"} className="btn">
              تسجيل دخول
            </Link>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("overlay-root") // 👈 outside layout!
  );
}
export function SuccessOrNotMessage({ success }) {
  return (
    <>
      {success ? (
        <div>
          <h1>تم شراء الكورس بنجاح</h1>
        </div>
      ) : (
        <div>
          <h1>رصيدك الحالي لا يكفي اشحن رصيدك وعاود الشراء مرة اخرى!</h1>
        </div>
      )}
    </>
  );
}
export function MessageTitle({ children }) {
  return <h1>{children}</h1>;
}
export function MessageButton({ children, auth, onClick, className }) {
  return (
    <>
      {auth ? (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      ) : (
        <Link>{children}</Link>
      )}
    </>
  );
}
export default CourseOverview;
