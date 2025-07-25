import React, { useReducer, useEffect, useState } from "react";
import { Circle, X } from "lucide-react";
import { useAuth, useEnrolledQuiz } from "../helpers/useauth";
import { useParams } from "react-router";
import axios from "axios";

//quiz handler reducer
const initialStateLesson = {
  lessonData: [],
  questionCurrent: null,
  // Quiz Status : Loading ,Error ,Ready ,Active,Finished
  status: "Loading",
  index: 0,
  answers: [],
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  // loadingNewContent: false,
};

// u can edit regular to solid or light in url
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        lessonData: action.newValue,
        status: "start",
      };
    case "setLessonData":
      return {
        ...state,
        status: "ready",
        questionCurrent: {
          choosedQuestion: state.lessonData.questions[0],
          index: 0,
        },
        secondsRemaining: state.lessonData.questions.length * 1600,
      };
    case "setQuestionCurrent":
      return {
        ...state,
        questionCurrent: action.newValue,
        status: action.newValue.status,
      };
    case "nextQuestion":
      return {
        ...state,
        questionCurrent: action.newValue,
        index: action.newValue.index,
      };
    case "newAnswer":
      return {
        ...state,
        answers: [
          ...state.answers.filter((ans) => {
            return ans.questionId !== action.payload.questionId;
          }),
          action.payload,
        ] /*answer index  */,
        // points: action.payload.correctValue ? state.points + 5 : state.points,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining > 0
            ? state.secondsRemaining - 1
            : state.secondsRemaining,
      };
    default:
      throw new Error("cannot fetch data");
  }
}

// Mock data for demonstration
const mockQuizData = {
  questions: [
    {
      _id: "1",
      title: "ما هو لون السماء؟",
      questionOptions: [
        { title: "أحمر" },
        { title: "أزرق" },
        { title: "أخضر" },
        { title: "أصفر" },
      ],
    },
    {
      _id: "2",
      title: "كم عدد أيام الأسبوع؟",
      questionOptions: [
        { title: "5" },
        { title: "6" },
        { title: "7" },
        { title: "8" },
      ],
    },
    {
      _id: "3",
      title: "ما هي عاصمة مصر؟",
      questionOptions: [
        { title: "الإسكندرية" },
        { title: "القاهرة" },
        { title: "الجيزة" },
        { title: "أسوان" },
      ],
    },
  ],
};

// Timer component
function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    if (secondsRemaining === 0) {
      dispatch({ type: "finished" });
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, dispatch]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <div className="text-center">
        <span className="font-bold text-lg">
          الوقت المتبقي: {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function Quiz() {
  const [lessonDatas, dispatch] = useReducer(reducer, initialStateLesson);
  const { id, lessonId } = useParams();
  const { user, auth } = useAuth();
  const [loadingNewContent, setLoadingNewContent] = useState();

  const { data = {}, isLoading, isError } = useEnrolledQuiz(id, lessonId);
  console.log(data);
  const [opacity, setIsOpacity] = useState(0);

  function handleSetquestionCurrent(index) {
    const choosedQuestion = lessonDatas.lessonData.questions[index];
    dispatch({
      type: "setQuestionCurrent",
      newValue: { choosedQuestion, index },
    });
  }
  function handleSetNewLoadingContent(value) {
    setLoadingNewContent(value);
  }

  // nextQuestion
  function handleNextQuestion(index) {
    if (index >= lessonDatas.lessonData.questions.length - 1 || index < -1)
      return;
    setIsOpacity(0);
    setLoadingNewContent(true);
    const choosedQuestion = lessonDatas.lessonData.questions[index + 1];
    console.log("choosedQuestion", choosedQuestion);
    dispatch({
      type: "nextQuestion",
      newValue: { choosedQuestion, index: index + 1 },
    });
  }
  // setNewAnswer
  function handleAnswer(optionChosen) {
    dispatch({ type: "newAnswer", payload: optionChosen });
  }

  function handlesetIsOpacity(value) {
    setIsOpacity(value);
  }

  useEffect(() => {
    // Mock data loading
    if (!isLoading) dispatch({ type: "start", newValue: data?.quizLesson });
  }, [data]);

  return (
    <>
      {lessonDatas.status === "finished" ? (
        <FinishedComponent
          lessonData={lessonDatas}
          id={id}
          lessonId={lessonId}
        />
      ) : lessonDatas.status === "start" ? (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            الاختبار جاهز للبدء !
          </h1>
          <button
            onClick={() => {
              dispatch({ type: "setLessonData" });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            ابدا الاختبار
          </button>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="flex w-full h-full">
            {window.innerWidth > 800 && (
              <div className="w-1/4 bg-white border-r border-gray-200 shadow-sm">
                <div className="quiz-questions-bar h-full p-6">
                  <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    الاسئلة
                  </h1>
                  <div className="questions flex justify-center">
                    <Question
                      handleSetquestionCurrent={handleSetquestionCurrent}
                      lessonData={lessonDatas.lessonData}
                      handleSetNewLoadingContent={handleSetNewLoadingContent}
                      handlesetIsOpacity={handlesetIsOpacity}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 p-6">
              <Timer
                dispatch={dispatch}
                secondsRemaining={lessonDatas.secondsRemaining}
              />

              {lessonDatas.questionCurrent && (
                <QuestionContent
                  handleAnswer={handleAnswer}
                  lessonData={lessonDatas?.lessonData}
                  questionContentData={lessonDatas?.questionCurrent}
                  loadingNewContent={loadingNewContent}
                  setLoadingFalse={handleSetNewLoadingContent}
                  opacity={opacity}
                  setIsOpacity={handlesetIsOpacity}
                  handleNextQuestion={handleNextQuestion}
                  dispatch={dispatch}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//question content !
function QuestionContent({
  questionContentData,
  loadingNewContent,
  setLoadingFalse,
  opacity,
  setIsOpacity,
  handleNextQuestion,
  lessonData,
  handleAnswer,
  dispatch,
}) {
  // opactiy logic
  useEffect(
    function () {
      setLoadingFalse(false);
      setIsOpacity(0);
      const timer = setTimeout(() => {
        console.log(opacity);
        setIsOpacity(1);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    },
    [loadingNewContent]
  );
  //end opactiy logic
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto"
        style={{
          marginTop: opacity === 1 ? "0px" : "-30px",
          opacity: opacity,
          transition: opacity === 1 ? "0.5s ease-in-out" : "none",
        }}
      >
        <h1 className="text-2xl font-bold mt-2 mb-6 text-gray-800">
          {" "}
          السؤال {questionContentData.index + 1}
        </h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h1 className="text-xl font-semibold mb-6 text-gray-800">
            {questionContentData.choosedQuestion.title}
          </h1>
          <div className="font-bold mt-5">
            <Option
              handleAnswer={handleAnswer}
              questionContentData={questionContentData}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => {
              handleNextQuestion(questionContentData.index - 2);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50"
            disabled={questionContentData.index === 0}
          >
            <span>السؤال السابق </span>
          </button>
          <button
            onClick={() => {
              if (
                questionContentData.index ===
                lessonData.questions.length - 1
              ) {
                dispatch({ type: "finished" });
              }
              handleNextQuestion(questionContentData.index);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            {" "}
            <span>
              {" "}
              {questionContentData?.index === lessonData?.questions.length - 1
                ? "انهاء الاختبار"
                : "السؤال التالي"}{" "}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

//////////
// option comp in question content
function Option({ questionContentData, handleAnswer }) {
  console.log(questionContentData.choosedQuestion);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const letters = ["ا", "ب", "ج", "د"];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionContentData?.choosedQuestion?.questionOptions?.map((op, i) => (
          <div
            key={i}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedOptionIndex === i
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
            onClick={() => {
              setSelectedOptionIndex(i);
              handleAnswer({
                op,
                questionId: questionContentData.choosedQuestion._id,
                selectedOptionId: op._id,
              });
            }}
          >
            <span className="font-semibold text-gray-700">
              {`${letters[i]}  ${op && op?.title}`}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

///////
//////
/// question bar comp
function Question({
  handleSetquestionCurrent,
  lessonData,
  handleSetNewLoadingContent,
  handlesetIsOpacity,
}) {
  return (
    <div className="question w-full px-2 cursor-pointer">
      {lessonData &&
        lessonData?.questions?.map((q, i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between mb-4 p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 w-full">
                <X className="text-purple-500 flex-shrink-0" size={20} />
                <h1
                  className="text-lg text-center font-medium hover:text-blue-600 transition-colors flex-grow"
                  onClick={() => {
                    handleSetquestionCurrent(i);
                    handleSetNewLoadingContent(true);
                    handlesetIsOpacity(0);
                  }}
                >
                  السؤال {i + 1}
                </h1>
                <Circle className="text-gray-400 flex-shrink-0" size={20} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

function FinishedComponent({ lessonData, id, lessonId }) {
  console.log(lessonData.answers);

  useEffect(function () {
    const sendAnswers = async (answers) => {
      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/courses/enroll/${id}/quiz/enroll/${lessonId}/result`,
          {
            answers,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);

        return res;
      } catch (error) {
        console.log(error);
      }
    };
    sendAnswers(lessonData.answers);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          انتهى الاختبار ! جاري ارسال الاجابات .......
        </h1>
        <p className="text-gray-600">شكراً لك على إكمال الاختبار</p>
      </div>
    </div>
  );
}
