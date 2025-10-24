import { BrowserRouter, Route, Router, Routes } from "react-router";
import Login from "./pages/Login";
import CourseContent from "./pages/CourseContent";
import Layout from "./pages/Layout";
import Browse from "./pages/Browse";
import NotFound from "./pages/NotFound";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CourseOverview from "./pages/CourseOverview";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import Transaction from "./pages/Transaction";
import { Result } from "./pages/Results";
import Quiz from "./pages/Quiz";
import FollowUp from "./pages/FollowUp";
import Test from "./pages/test";
import ResetPassword from "./pages/ResetPassword";
import ResultQuiz from "./pages/ResultQuiz";
import ReviewSchedule from "./pages/ReviewSchedule";
import EditCourses from "./pages/editCourses";
import LoginAdmin from "./pages/LoginAdmin";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} /> {/* /login */}
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/admin/upload" element={<EditCourses />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          {/* /login/reset */}
          {/* عايزين هنا نخلي الصفحة الرئيسية مفهاش القائمة اللي على الشمال ولما تسجل بس تظهر للمسجل دخوله وكمان تخليها تقدر تفتحها وتقفلها  */}{" "}
          <Route path="/" element={<Layout />}>
            <Route path="/browse/" element={<Browse />} />
            <Route path="/courses/:id" element={<CourseOverview />} />
            <Route path="/courses/enroll/:id" element={<CourseContent />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/my-courses/" element={<MyCourses />} />
            <Route path="/transaction/" element={<Transaction />} />
            <Route path="/certificate/" element={<Result />} />
            <Route path="/review" element={<ReviewSchedule />} />
            <Route path="/certificate/:id" element={<ResultQuiz />} />
            <Route path="/courses/:id/quiz/:lessonId" element={<Quiz />} />
            <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/test" element={<Test />} />

            {/* <Route path="/browse" element={<Browse />} />
        <Route path="/courses/:id" element={<Course />} />
        
        
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:id/quiz/:lessonId" element={<Quiz />} />
        <Route path="/cart" element={<Cart />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
