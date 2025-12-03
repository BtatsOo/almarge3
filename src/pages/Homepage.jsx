import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Users,
  BookOpen,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useCourses } from "../helpers/useauth";
import { LoadingComponent } from "./Loading";
const Homepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user = {}, auth } = useAuth();
  const { data, isLoading, isError } = useCourses();
  console.log(auth);
  console.log(data, "courses");

  // img width and height 400*300
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-right"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto  py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:w-[30%] sm:w-[80%]  space-x-4 space-x-reverse justify-start">
              <div className=" text-white flex md:w-[140px] w-[100px] pl-4 rounded-lg">
                <img
                  className="rounded-[900px] md:w-full lg:w-full w-[100px] sm:w-[100px] "
                  src="https://i.postimg.cc/Px6rnLwh/Chat-GPT-Image-May-16-2025-04-58-59-PM.png"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                  المرجع ثانوية ببساطة
                </h1>
                <p className="text-sm text-gray-600"> الثانوية اسهل معانا !</p>
              </div>
            </div>

            {/* Desktop Navigation */}

            <nav className="hidden md:flex space-x-8 space-x-reverse items-center justify-between w-[70%] ">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                الرئيسية
              </Link>
              <Link
                to="/browse"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                الكورسات
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                من نحن
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium "
              >
                اتصل بنا
              </Link>
              {!auth ? (
                <div className="flex gap-4 items-center">
                  {/* Your chosen button styles go here */}
                  <Link
                    to="/login"
                    className="bg-gray-800 lg:text-sm md:text-[13px] text-center  hover:bg-gray-900 text-white md:font-medium py-3 rounded-xl  md:w-[10vw]   shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-700"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/login"
                    className=" bg-blue-950 rounded-xl text-[1.2vw text-white md:px-2 lg:font-medium py-3 lg:px-8  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                  >
                    تسجيل
                  </Link>{" "}
                </div>
              ) : (
                <Link
                  to="/profile"
                  className=" bg-blue-950 hover:to-purple-700 text-white px-4 lg:font-medium py-3 lg:px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  حسابي
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  الرئيسية
                </Link>
                <Link
                  to="/browse"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  الكورسات
                </Link>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  من نحن
                </Link>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium "
                >
                  اتصل بنا
                </Link>
                {/* Your chosen button styles go here */}
                {!auth ? (
                  <>
                    {/* Your chosen button styles go here */}
                    <Link
                      to="/login"
                      className="bg-gray-800 text-sm md:w-[150px] w-fit hover:bg-gray-900 text-white md:font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-700"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/login"
                      className=" bg-blue-950 hover:to-purple-700 w-fit text-white px-4 lg:font-medium py-3 lg:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      تسجيل
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/profile"
                    className=" bg-blue-950 hover:to-purple-700 text-white px-4 lg:font-medium py-3 lg:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                  >
                    حسابي
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-40 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">الثانوية بقت اسهل معانا !</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            كل اللي محتاجه عشان تتفوق في الثانوية هتلاقيه في منصة المرجع هنا! من
            شروحات إلى تمارين تطبيقية وحلول نموذجية، هنساعدك تذاكر وتفهم كل حاجة
            بسهولة. انضم لينا دلوقتي وابدأ رحلتك للنجاح!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to={"/login"}
              className="bg-white hover:transition-colors hover:bg-transparent border-2 cursor-pointer border-white hover:text-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              ابدأ التعلم الآن
            </NavLink>
            <NavLink
              to={"/browse"}
              className="border-2 border-white cursor-pointer  text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              تصفح الدورات
            </NavLink>
          </div>
        </div>
      </section>

      {/* Courses Slider */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              الكورسات المتاحة
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر الكورس المناسب لك من بين مجموعة متنوعة من الكورسات المصممة
              خصيصاً لطلاب الثانوية العامة
            </p>
          </div>

          {isLoading ? (
            <LoadingComponent
              size="xl"
              message="يتم التحميل ..."
              color="blue"
            />
          ) : !isLoading && !isError ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div
                    className="relative h-[380px] bg-cover bg-no-repeat bg-gradient-to-br from-blue-50 to-indigo-100"
                    style={{ backgroundImage: `url(${course.featuredImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-gray-700">
                        {course.duration}
                      </span>
                    </div>
                    {/* Placeholder for actual course image */}
                  </div>

                  <div className="p-6 h-[550px] flex flex-col justify-between">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>

                    <div className="">
                      <div className="flex items-center justify-start ">
                        <span className="text-gray-600 text-sm">المدرس:</span>
                        <span className="text-gray-800 font-medium">
                          {course.provider}
                        </span>
                      </div>
                    </div>

                    {course.features && (
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {course.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <Check className="w-4 h-4 text-green-500 ml-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-2xl font-bold text-blue-600">
                          {course.price}
                        </span>
                        <span className="text-gray-600 mx-1">جنيه</span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course._id}`}
                      className="w-full text-center  bg-gray-800 cursor-pointer text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                      اشترك الآن
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "error"
          )}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">من نحن</h3>
            <p
              className="text-xl text-gray-600 mb-8 tracking-widest"
              style={{ lineHeight: "36px" }}
            >
              في منصة المرجع ، إحنا معاك في كل خطوة في رحلة الثانوية العامة.
              هتلاقي شرح مبسط لكل المواد، وفيديوهات تساعدك تنظم وقتك وتنجز أكتر
              في أقل وقت. وعندنا كمان خدمة متابعة نفسية وتحفيزية علشان نساعدك
              تفضل ثابت ومتحفز طول السنة. بنقدملك طرق فعالة للمذاكرة، ونظام
              يخليك ملتزم وتذاكر بذكاء، مش بكترة الساعات. هدفنا إننا نخلي
              الثانوية ببساطة... زي اسمنا بالظبط!
              <span className="text-blue-600 font-semibold">
                {" "}
                ابدأ رحلتك معانا وخلّي السنة دي مختلفة!{" "}
              </span>
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  +3,000 طالب
                </h4>
                <p className="text-gray-600">طلاب ثانوية عامة متفوقون</p>
              </div> */}
              {/* <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  +10 كورسات
                </h4>
                <p className="text-gray-600">كورسات متخصصة لمادة الحاسوب</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  4.8/5 تقييم
                </h4>
                <p className="text-gray-600">متوسط تقييم الطلاب للمنصة</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">اتصل بنا</h3>
              <p className="text-xl">نحن هنا لمساعدتك في رحلتك التعليمية</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-6">تواصل معنا</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full ml-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">البريد الإلكتروني</p>
                      <p>info@learning-platform.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full ml-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">العنوان</p>
                      <p>الاسكندرية, مصر</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="w-full p-3 rounded-lg border-white border-3 outline-0 text-white"
                  />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full p-3 rounded-lg text-white  border-white border-3 outline-0"
                  />
                  <textarea
                    placeholder="الرسالة"
                    rows={4}
                    className="w-full p-3 rounded-lg text-white  border-white border-3 outline-0"
                  ></textarea>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    إرسال الرسالة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r text-white flex md:w-[90px] w-[80px] pl-4 rounded-lg">
                <img
                  className="rounded-[900px] md:w-full lg:w-full w-[100px] sm:w-[100px] "
                  src="https://i.postimg.cc/Px6rnLwh/Chat-GPT-Image-May-16-2025-04-58-59-PM.png"
                  alt=""
                />
              </div>
              <h5 className="text-xl font-bold">المرجع ثانوية ببساطة</h5>
            </div>
            <p className="text-gray-400 mb-4">
              © 2025 المرجع ثانوية ببساطة. جميع الحقوق محفوظة
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                المساعدة
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
