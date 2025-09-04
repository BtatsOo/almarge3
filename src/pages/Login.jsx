import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Users,
  Eye,
  EyeOff,
  BookOpen,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { authenticateUser, createUser, isAuthenticated } from "../helpers/auth";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../helpers/useauth";

export default function ArabicLoginRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState("");
  const navigateIfSuccessLogin = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    governorate: "",
    phoneNumber: "",
    guardianPhone: "",
    email: "",
    class: "",
  });
  // console.log(formData.class);
  // Check Auth First
  const { data: { data } = {}, isLoading } = useAuth();

  // End Check Auth First
  const egyptGovernorates = [
    { value: "", label: "اختر المحافظة" },
    { value: "القاهرة", label: "القاهرة" },
    { value: "الإسكندرية", label: "الإسكندرية" },
    { value: "الجيزة", label: "الجيزة" },
    { value: "القليوبية", label: "القليوبية" },
    { value: "الدقهلية", label: "الدقهلية" },
    { value: "الشرقية", label: "الشرقية" },
    { value: "الغربية", label: "الغربية" },
    { value: "المنوفية", label: "المنوفية" },
    { value: "البحيرة", label: "البحيرة" },
    { value: "الإسماعيلية", label: "الإسماعيلية" },
    { value: "السويس", label: "السويس" },
    { value: "بورسعيد", label: "بورسعيد" },
    { value: "دمياط", label: "دمياط" },
    { value: "كفر الشيخ", label: "كفر الشيخ" },
    { value: "بني سويف", label: "بني سويف" },
    { value: "الفيوم", label: "الفيوم" },
    { value: "المنيا", label: "المنيا" },
    { value: "أسيوط", label: "أسيوط" },
    { value: "سوهاج", label: "سوهاج" },
    { value: "قنا", label: "قنا" },
    { value: "الأقصر", label: "الأقصر" },
    { value: "أسوان", label: "أسوان" },
    { value: "البحر الأحمر", label: "البحر الأحمر" },
    { value: "الوادي الجديد", label: "الوادي الجديد" },
    { value: "مطروح", label: "مطروح" },
    { value: "شمال سيناء", label: "شمال سيناء" },
    { value: "جنوب سيناء", label: "جنوب سيناء" },
  ];
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
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const token = await authenticateUser(username, password);
  //     if (token) {
  //       navigateIfSuccessLogin("/browse");
  //     }
  //     // Redirect to the homepage after successful login
  //   } catch (error1) {
  //     setError(error1.message);
  //     // temprorily
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedTargetName = formData.username.trim();
    const cleanedTargetPassword = formData.password.trim();

    if (isRegisterMode) {
      try {
        const token = await createUser(
          cleanedTargetName,
          cleanedTargetPassword,
          formData.email,
          formData.phoneNumber,
          formData.governorate,
          formData.guardianPhone,
          formData.class
        );
        if (token) {
          console.log(token);
          navigateIfSuccessLogin("/browse");
        }
      } catch (error1) {
        console.log(error1);
        setError(error1.message);
      }
    } else {
      try {
        const token = await authenticateUser(
          cleanedTargetName,
          cleanedTargetPassword
        );
        if (token) {
          console.log(token);

          navigateIfSuccessLogin("/browse");
        }
      } catch (error1) {
        console.log("error", error1);
        setError(error1.message);
      }
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    // Reset form when switching modes
    setFormData({
      username: "",
      password: "",
      governorate: "",
      phoneNumber: "",
      guardianPhone: "",
      email: "",
      class: "",
    });
    setError("");
  };
  // useEffect(function () {
  //   async function kofta() {
  //     const res = await isAuthenticated();
  //     console.log(res);
  //     console.log("Sdsds");
  //   }
  //   kofta();
  // }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-2 sm:p-4"
      dir="rtl"
    >
      <div className="max-w-6xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse min-h-[600px] lg:min-h-[700px]">
          {/* Left Side - Illustration (no logic) */}
          <div className="lg:w-1/2 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 p-4 sm:p-6 lg:p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-3 sm:left-5 w-12 sm:w-16 h-12 sm:h-16 bg-yellow-300/20 rounded-full blur-lg"></div>

            {/* Main illustration */}
            <div className="relative z-10 text-center max-w-sm">
              {/* Educational illustration */}
              <div className="mb-4 sm:mb-8 relative">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
                  <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="bg-cyan-400 p-2 sm:p-3 lg:p-4 rounded-full shadow-lg transform rotate-12 animate-pulse">
                      <GraduationCap className="w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 text-blue-900" />
                    </div>
                    <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-full shadow-lg transform -rotate-6 animate-bounce">
                      <BookOpen className="w-5 sm:w-7 lg:w-10 h-5 sm:h-7 lg:h-10 text-teal-600" />
                    </div>
                  </div>

                  {/* Student figure */}
                  <div className="relative">
                    <div className="bg-white/20 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <div className="bg-cyan-200 w-12 sm:w-14 lg:w-20 h-12 sm:h-14 lg:h-20 rounded-full flex items-center justify-center">
                        <User className="w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 text-teal-700" />
                      </div>
                    </div>

                    {/* Floating books with animation */}
                    <div className="absolute -top-1 sm:-top-2 -right-4 sm:-right-8 bg-orange-400 w-4 sm:w-6 lg:w-8 h-5 sm:h-7 lg:h-10 rounded transform rotate-12 shadow-lg animate-pulse"></div>
                    <div className="absolute top-4 sm:top-8 -left-3 sm:-left-6 bg-emerald-400 w-4 sm:w-6 lg:w-8 h-5 sm:h-7 lg:h-10 rounded transform -rotate-12 shadow-lg animate-pulse delay-75"></div>
                    <div className="absolute -bottom-1 sm:-bottom-2 right-2 sm:right-4 bg-purple-400 w-4 sm:w-6 lg:w-8 h-5 sm:h-7 lg:h-10 rounded transform rotate-45 shadow-lg animate-pulse delay-150"></div>
                  </div>

                  {/* Study elements */}
                  <div className="flex justify-center space-x-2 sm:space-x-3 mt-4 sm:mt-6">
                    <div className="bg-white/30 p-1 sm:p-2 rounded-lg">
                      <div className="w-4 sm:w-6 h-3 sm:h-4 bg-cyan-300 rounded"></div>
                    </div>
                    <div className="bg-white/30 p-1 sm:p-2 rounded-lg">
                      <div className="w-4 sm:w-6 h-3 sm:h-4 bg-teal-300 rounded"></div>
                    </div>
                    <div className="bg-white/30 p-1 sm:p-2 rounded-lg">
                      <div className="w-4 sm:w-6 h-3 sm:h-4 bg-blue-300 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="flex justify-center space-x-2">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/40 rounded-full"></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/60 rounded-full"></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/40 rounded-full"></div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                {isRegisterMode
                  ? "انضم إلى منصة المرجع"
                  : "اهلا بيك في منصة المرجع"}
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                هتتعلم هتلتزم هتتفوق ...ايوة هتتفوق !
              </p>
            </div>
          </div>
          {/* End Of Left Side - Illustration (no logic) */}

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <User className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {isRegisterMode ? "إنشاء حساب جديد" : "تسجيل دخول الطالب"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isRegisterMode
                    ? "أدخل بياناتك لإنشاء حساب جديد"
                    : "أدخل بياناتك للوصول إلى حسابك"}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
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
                      {error ===
                      "Student validation failed: city: Path `city` is required."
                        ? "ادخل المحافظة من فضلك !"
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

                  {/* Registration fields - shown only in register mode */}
                  {isRegisterMode && (
                    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                      {/* Governorate */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          المحافظة
                        </label>
                        <div className="relative">
                          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                          <select
                            name="governorate"
                            value={formData.governorate}
                            onChange={handleInputChange}
                            required
                            className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right appearance-none cursor-pointer text-sm sm:text-base hover:border-gray-300"
                          >
                            {egyptGovernorates.map((gov) => (
                              <option key={gov.value} value={gov.value}>
                                {gov.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                          </div>
                        </div>
                      </div>
                      {/* class */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          الصف الدراسي
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                          <select
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            required
                            className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right appearance-none cursor-pointer text-sm sm:text-base hover:border-gray-300"
                          >
                            <option key={""} value={""}>
                              اختر الصف الدراسي
                            </option>
                            <option
                              key={"الصف الثالث الثانوي"}
                              value={"الصف الثالث الثانوي"}
                            >
                              الصف الثالث الثانوي
                            </option>
                            <option
                              key={"الصف الثالث الثانوي سنتر"}
                              value={"الصف الثالث الثانوي center"}
                            >
                              الصف الثالث الثانوي (طلبة السنتر فقط )
                            </option>
                            <option
                              key={"الصف الثاني الثانوي"}
                              value={"الصف الثاني الثانوي"}
                            >
                              الصف الثاني الثانوي
                            </option>
                            <option
                              key={"الصف الاول الثانوي"}
                              value={"الصف الاول الثانوي"}
                            >
                              الصف الأول الثانوي
                            </option>
                          </select>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                          </div>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          البريد الالكتروني
                        </label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                            placeholder="01xxxxxxxxx"
                            required
                          />
                        </div>
                      </div>
                      {/* Phone Number */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          رقم الهاتف
                        </label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                            placeholder="01xxxxxxxxx"
                            required
                          />
                        </div>
                      </div>

                      {/* Guardian Phone */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          رقم هاتف ولي الأمر
                        </label>
                        <div className="relative">
                          <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                          <input
                            type="tel"
                            name="guardianPhone"
                            value={formData.guardianPhone}
                            onChange={handleInputChange}
                            className="w-full pr-8 sm:pr-10 pl-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-right text-sm sm:text-base hover:border-gray-300"
                            placeholder="01xxxxxxxxx"
                            required
                          />
                        </div>
                      </div>
                      <p className="text-sm text-red-600 mt-2 mb-0 no-underline">
                        {error ===
                        "Student validation failed: city: Path `city` is required."
                          ? "ادخل المحافظة من فضلك !"
                          : error.includes("E11000") && error.includes("name")
                          ? "هذا الاسم موجود بالفعل جرب اسما اخر !"
                          : error.includes("E11000") && error.includes("email")
                          ? "هذا الايميل موجود بالفعل جرب ايميل اخر !"
                          : error === "space not allowed in password"
                          ? "غير مسموح بادخال مسافات في كلمة المرور !"
                          : error
                          ? "حدث خطأ ما، الرجاء المحاولة مرة أخرى !"
                          : ""}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r cursor-pointer mt-5 from-teal-600 to-cyan-600 text-white py-2.5 sm:py-3 px-6 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300 hover:from-teal-700 hover:to-cyan-700"
                  >
                    {isRegisterMode ? "إنشاء الحساب" : "تسجيل الدخول"}
                  </button>

                  {/* Additional Links */}
                  <div className="text-center space-y-2 sm:space-y-3 pt-3 sm:pt-4">
                    {!isRegisterMode && (
                      <Link
                        to="/login/reset"
                        className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors duration-200 block hover:underline"
                      >
                        نسيت كلمة المرور؟
                      </Link>
                    )}
                    <div className="text-gray-600 text-sm">
                      {isRegisterMode
                        ? "لديك حساب بالفعل؟ "
                        : "ليس لديك حساب؟ "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-teal-600 cursor-pointer hover:text-teal-800 font-medium transition-colors duration-200 hover:underline focus:outline-none"
                      >
                        {isRegisterMode ? "تسجيل الدخول" : "إنشاء حساب جديد"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
