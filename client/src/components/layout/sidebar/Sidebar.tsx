import { NavLink } from "react-router-dom";
import homeIcon from "../../../assets/icons/home-icon.svg";
import teamsIcon from "../../../assets/icons/teams-icon.svg";
import employeesIcon from "../../../assets/icons/employees-icon.svg";
import settingsIcon from "../../../assets/icons/settings-icon.svg";

import activeHome from "../../../assets/icons/active-home.svg";
import activeTeams from "../../../assets/icons/active-teams.svg";
import activeEmployees from "../../../assets/icons/active-employees.svg";
import activeSettings from "../../../assets/icons/active-settings.svg";

import "./Sidebar.css";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="sidebar-wrapper">
        <li className="sidebar-item">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeHome : homeIcon}
                  alt="home-icon"
                  className="sidebar-icon"
                />
                <span className="sidebar-menu">Bosh sahifa</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/category"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeTeams : teamsIcon}
                  alt="teams-icon"
                  className="sidebar-icon"
                />
                <span className="sidebar-menu">Kategoriyalar</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/subcategory"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeTeams : teamsIcon}
                  alt="teams-icon"
                  className="sidebar-icon"
                />
                <span className="sidebar-menu">Subkategoriyalar</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeEmployees : employeesIcon}
                  alt="employees-icon"
                  className="sidebar-icon"
                />
                <span className="sidebar-menu">Mahsulotlar</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeSettings : settingsIcon}
                  alt="settings-icon"
                  className="sidebar-icon"
                />
                <span className="sidebar-menu">Sozlamalar</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
