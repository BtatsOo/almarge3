import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // ← important
import dayjs from "dayjs";
import { useAuth } from "../helpers/useauth";
import axios, { Axios } from "axios";
import { DeleteIcon, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function ReviewSchedule() {
  const queryClient = useQueryClient();
  const [lessonTitle, setLessonTitle] = useState();
  const [details, setDetails] = useState(false);
  const [startDate, setStartDate] = useState(); //(YYYY-MM-DD)
  const [error, setError] = useState(); //(YYYY-MM-DD)
  // const [selectedEvent, setSelectedEvent] = useState(null);

  // console.log("eventsbefore", eventsBefore);
  const [events, setEvents] = useState([]);
  // console.log(events);
  const { user = {}, auth } = useAuth();
  // console.log("userfromuser", events);
  useEffect(() => {
    // console.log("from useEffect", user?.events?.length);

    if (user?.events?.length > 0) {
      console.log("from inside if ", user);
      const newReviews = user.events.flatMap((el) => {
        const reviews = generateReviews(el.date, el.title, el._id);
        return reviews;
      });
      setEvents((prev) => [...newReviews]);

      // console.log(newReviews);
    }
  }, [user]);

  // save in data base
  async function saveToServer(startDate, title) {
    // fetching to save data
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/event`,
        {
          data: {
            title,
            date: startDate,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      queryClient.setQueryData(["user"], (oldData) => {
        if (!oldData?.data?.user) return oldData; // safety check
        return {
          ...oldData,
          data: {
            ...oldData.data,
            user: {
              ...oldData.data.user,
              events: response.data.message.events, // <-- only replace events
            },
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteReq(el, dateStr) {
    console.log(typeof el._id);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/event`,
        {
          action: "delete",
          eventId: el._id,
        },
        {
          withCredentials: true,
        }
      );
      queryClient.setQueryData(["user"], (oldData) => {
        if (!oldData?.data?.user) return oldData; // safety check
        return {
          ...oldData,
          data: {
            ...oldData.data,
            user: {
              ...oldData.data.user,
              events: response.data.events.events, // <-- only replace events
            },
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  // Function لتوليد المراجعات
  function generateReviews(startDate, title, eventId) {
    const stages = [0, 1, 3, 7, 14, 30, 60, 120];
    if (!title) return;
    return stages.map((days) => ({
      title: `${title} ${days > 0 ? `(بعد ${days} يوم)  ` : "(النهاردة)"}`,
      date: dayjs(startDate).add(days, "day").format("YYYY-MM-DD"),
      _id: eventId ? eventId : "",
    }));
  }

  // إضافة درس جديد
  const addLesson = async () => {
    // save to server
    const kofta = await saveToServer(startDate, lessonTitle);
    console.log(startDate);
    // const newReviews = generateReviews(startDate, lessonTitle);
    // setEvents((prev) => [...prev, ...newReviews]);
  };

  return (
    <>
      {auth ? (
        <div>
          <div className="sm:flex mr-10 ml-5  mt-2.5 mb-2">
            <div className="flex  flex-col mx-3 ">
              <label htmlFor="">تاريخ البدء</label>
              <input
                className="w-50% px-4 py-3 mt-2  border-2   border-gray-200 rounded-xl text-right text-base
            focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none 
            transition-all duration-300 hover:border-gray-300 hover:shadow-sm
            placeholder-gray-400"
                type="text"
                placeholder="اسم الدرس اللي هتراجعه"
                onChange={(e) => {
                  setLessonTitle(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="">تاريخ البدء</label>
              <input
                className="w-50% px-4 py-3 border-2  mt-2 border-gray-200 rounded-xl text-right text-base
              focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none 
              transition-all duration-300 hover:border-gray-300 hover:shadow-sm
              placeholder-gray-400"
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            onClick={addLesson}
            className="p-2 mr-12 bg-blue-500 block rounded-2xl mx-3  cursor-pointer text-white rounded mb-4"
          >
            ➕ إضافة درس جديد
          </button>
          <div style={{ height: "600px", overflowY: "auto" }}>
            {events?.length > 0 ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={(e) => {
                  const reviewInThisDate = events.filter(
                    (el) => el.date === e.dateStr
                  );
                  console.log(reviewInThisDate);

                  setDetails(
                    reviewInThisDate?.length > 0
                      ? reviewInThisDate
                      : [
                          {
                            title: "لا يوجد في هذا اليوم مراجعات",
                            date: e.dateStr,
                          },
                        ]
                  );
                }}
                dayCellDidMount={(arg) => {
                  arg.el.addEventListener("click", () => {
                    const elDate = dayjs(arg.date).format("YYYY-MM-DD");
                    const reviewInThisDate = events.filter(
                      (el) => el.date === elDate
                    );
                    console.log(reviewInThisDate);

                    setDetails(
                      reviewInThisDate?.length > 0
                        ? reviewInThisDate
                        : [
                            {
                              title: "لا يوجد في هذا اليوم مراجعات",
                              date: elDate,
                            },
                          ]
                    );
                  });
                }}
              />
            ) : (
              ""
            )}
          </div>

          {details ? (
            <>
              <div className="bg-gradient-to-br my-20  from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-indigo-200">
                  {details[0]?.date}
                </h1>
                <div className="space-y-3 flex items-center ">
                  {details.map((el) => {
                    return (
                      <div className=" bg-white rounded-lg px-5 py-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 border border-gray-100 w-full flex items-center justify-between">
                        <p key={el.title} className="text-gray-700 ">
                          {el.title}
                        </p>
                        <Trash2
                          onClick={() => {
                            deleteReq(el);
                          }}
                          className="rounded-4xl p-1 border-2 cursor-pointer hover:bg-red-600  transition ease-in-out duration-400 "
                          size={30}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div>sd</div> */}
            </>
          ) : null}
        </div>
      ) : (
        <div>يجب عليك تسجيل الدخول اولا!</div>
      )}
      {error ? <p></p> : ""}
    </>
  );
}
