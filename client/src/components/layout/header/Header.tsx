import "./Header.css";
import { Link } from "react-router-dom";
import admin from "../../../assets/images/admin.png";
import menuIcon from "../../../assets/icons/menu-icon.svg";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-menu">
        <Link to="/admin" className="header-logo">
          ANDIJON MEBEL
        </Link>
        <img
          src={menuIcon}
          alt="menu-icon"
          className="menu-icon"
          onClick={toggleSidebar}
        />
      </div>
      <div className="header-profile">
        <div className="profile-menu">
          <img src={admin} alt="admin-image" className="profile-img" />
          <p className="profile-username">
            Ro'zimuhammad <br /> <span className="profile-position">Admin</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
