import styles from "../css/SideBar.module.css";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../helpers/useauth";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { logOut } from "../helpers/auth";

function Layout() {
  const { user = {}, auth } = useAuth();
  console.log(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/profile", icon: "📁", label: "ملفي الشخصي" },
    { to: "/my-courses", icon: "📚", label: "كورساتي" },
    { to: "/browse", icon: "🌐", label: "استكشاف الدورات" },
    // { to: "/saved", icon: "🔖", label: "الدورات المحفوظة" },
    // { to: "/report", icon: "📊", label: "النتائج والتقارير" },
    { to: "/certificate", icon: "🎓", label: "نتائج الامتحانات" },
    { to: "/transaction", icon: "💳", label: "شحن الرصيد" },
    { divider: true },
    { to: "/help", icon: "🎧", label: "مركز المساعدة" },
    { to: location.pathname, icon: " 🚪", label: "تسجيل خروج " },
  ];
  const linksNotAuth = [
    { to: "/login", icon: "📁", label: " تسجيل الدخول" },
    { to: "/login/register", icon: "📚", label: "حساب جديد" },
    { to: "/browse", icon: "🌐", label: "استكشاف الدورات" },
    { divider: true },
    { to: "/help", icon: "🎧", label: "مركز المساعدة" },
    ,
  ];

  return (
    <div className={`flex h-screen ${styles.upheader} `}>
      {mobileMenuOpen ? (
        <div
          className="overlay"
          style={{
            backgroundColor: "black",
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: "0.1",
          }}
        ></div>
      ) : null}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg absolute top-0 right-0 z-4  cursor-pointer "
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <header
        className={`${styles.header} ${
          mobileMenuOpen ? "right-0! z-1 h-full" : ""
        }`}
      >
        {/* Sidebar with fixed width */}
        <aside className={`${styles.sidebar} `}>
          <div>
            <NavLink to={"/"} className={`${styles.title} mb-3 text-blue-500`}>
              المرجع -ثانوية ببساطة
            </NavLink>
            <nav className={styles.navSection}>
              {auth ? (
                <NavLink
                  to={"/transaction"}
                  className={
                    "bg-blue-950 text-center m-auto rounded-4xl py-4 pr-3 mb-4 font-bold text-white"
                  }
                >
                  الرصيد:
                  <span className="rounded-4xl bg-[var(--primary)] mr-2 text-white font-bold p-3">
                    {user.balance && user?.balance.toFixed(2)}{" "}
                  </span>
                </NavLink>
              ) : (
                ""
              )}
              {auth
                ? links.map((link, idx) =>
                    link.divider ? (
                      <div key={idx} className={styles.divider}></div>
                    ) : (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `${styles.navLink} ${isActive ? styles.active : ""}`
                        }
                        onClick={() => {
                          if (link.label === "تسجيل خروج ") {
                            logOut();
                          }
                        }}
                      >
                        <span className={styles.icon}>{link.icon}</span>
                        {link.label}
                      </NavLink>
                    )
                  )
                : linksNotAuth.map((link, idx) =>
                    link.divider ? (
                      <div key={idx} className={styles.divider}></div>
                    ) : (
                      <NavLink
                        key={link.label}
                        to={link.to}
                        className={({ isActive }) =>
                          `${styles.navLink} ${isActive ? styles.active : ""}`
                        }
                      >
                        <span className={styles.icon}>{link.icon}</span>
                        {link.label}
                      </NavLink>
                    )
                  )}
            </nav>
          </div>

          <div className={styles.sidebarFooter}>
            <button className={styles.collapseBtn}>▶</button>
          </div>
        </aside>
      </header>

      <main className={`flex-1 ${styles.main}`}>
        {/* Main content takes the rest of the space */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
