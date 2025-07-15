import React from "react";
import { useAuth } from "../helpers/useauth";
import { LoadingComponent } from "./Loading";

function Profile() {
  const { user, auth, isLoading } = useAuth();
  console.log(user);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : auth ? (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <div className="w-[80%]  mx-auto">
            {/* Profile Card */}
            <div className="bg-white  rounded-lg shadow-sm p-8 scale-110">
              {/* Profile Header */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-8 ">
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/j5SdJLGM/nat.png"
                    alt="Profile"
                    className="w-20 h-20 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600"></p>
                  <p className="text-gray-500 text-sm">
                    {user.city ? `${user.city},` : ""} مصر
                  </p>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  المعلومات الشخصية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      الاسم كاملا
                    </label>
                    <div className="text-gray-900">{user.name}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      الرصيد
                    </label>
                    <div className="text-gray-900">
                      {(user.balance === 0 || user.balance) &&
                        user.balance.toFixed(2)}
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      تاريخ الميلاد
                    </label>
                    <div className="text-gray-900">12-10-1990</div>
                  </div> */}

                  <div className="">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      البريد الإلكتروني
                    </label>
                    <p className="text-gray-900  break-words">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="text-gray-900">{user.phoneNumber}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      الدور الوظيفي
                    </label>
                    <div className="text-gray-900">طالب</div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  العنوان
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      الدولة
                    </label>
                    <div className="text-gray-900">مصر</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      المدينة
                    </label>
                    <div className="text-gray-900"> {user.city}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>سجل دخولك اولا!</div>
      )}{" "}
    </>
  );
}
export default Profile;
