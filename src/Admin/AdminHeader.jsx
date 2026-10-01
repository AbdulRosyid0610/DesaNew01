import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import "./AdminHeader.css";

function AdminHeader({ title, onMenuClick }) {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="mobile-menu-button" onClick={onMenuClick} aria-label="Buka menu">
          <FaBars />
        </button>
        <div>
          <h1>{title}</h1>
          <p>Kelola sistem Desa Margalaksana</p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <FaSearch />
          <input type="text" placeholder="Cari..." />
        </div>

        <button className="notification-button" aria-label="Notifikasi">
          <FaBell />
          <span className="notification-dot">3</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
