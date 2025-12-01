import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = (): void => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="layout">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="layout-main">
        <Header toggleSidebar={toggleSidebar} />
        {/* layout-content */}
        <main
          className={`layout-content ${
            isSidebarOpen ? "content-with-sidebar" : "content-no-sidebar"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
