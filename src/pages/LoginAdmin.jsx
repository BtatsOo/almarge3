import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authenticateUser } from "../helpers/auth";
import { Eye, EyeOff, User } from "lucide-react";

function LoginAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigateIfSuccessLogin = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    // console.log(e.target.name === "password");
    // console.log(/\s/.test(e.target.value));
    if (e.target.name === "password" && /\s/.test(e.target.value)) {
      setError("space not allowed in password");
      // console.log(error);
    } else {
      setError("");
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedTargetName = formData.username.trim();
    const cleanedTargetPassword = formData.password.trim();
    if (cleanedTargetName !== "admin") {
      const error12 = "غير مسموح لهذا الحساب الدخول للوحة التحكم !";
      // console.log("error", error12);
      setError(error12);
      throw new Error(error12);
    }
    try {
      const token = await authenticateUser(
        cleanedTargetName,
        cleanedTargetPassword
      );
      if (token) {
        console.log(token);

        navigateIfSuccessLogin("/admin/upload");
      }
    } catch (error1) {
      console.log("error1", error1);
      setError(error1.message);
    }
  };
  return (
    <div>
      <h1>تسجيل دخول الادمن</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            اسم المستخدم
          </label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
              ) : (
                <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pr-4 pl-8 sm:pl-10 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>
          <p className="text-sm text-red-600 mt-2 mb-0 no-underline">
            {error === "غير مسموح لهذا الحساب الدخول للوحة التحكم !"
              ? "غير مسموح لهذا الحساب الدخول للوحة التحكم !"
              : error == "Invalid UserName"
              ? "الاسم الذي ادخلته خطأ اكتب الاسم بشكل صحيح"
              : error === "Invalid username or password"
              ? "كلمة المرور التي ادخلتها غير صحيحة برجاء ادخال كلمة المرور بشكل صحيح او اضغط على نسيت كلمة المرور في حال نسيانها !"
              : error === "space not allowed in password"
              ? "غير مسموح بادخال مسافات في كلمة المرور !"
              : error
              ? "حدث خطأ ما، الرجاء المحاولة مرة أخرى !"
              : ""}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r cursor-pointer mt-5 from-teal-600 to-cyan-600 text-white py-2.5 sm:py-3 px-6 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300 hover:from-teal-700 hover:to-cyan-700"
        >
          تسجيل الدخول
        </button>
      </form>
      {/* Submit Button */}
    </div>
  );
}

export default LoginAdmin;
