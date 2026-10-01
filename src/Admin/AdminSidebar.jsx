// src/Admin/AdminSidebar.jsx
import {
  FaTachometerAlt,
  FaUsers,
  FaStore,
  FaNewspaper,
  FaComments,
  FaVideo,
  FaCog,
  FaTimes,
  FaLeaf,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { id: "warga", label: "Data Warga", icon: FaUsers },
  { id: "umkm", label: "Kelola UMKM", icon: FaStore },
  { id: "berita", label: "Kelola Berita", icon: FaNewspaper },
  { id: "pengaduan", label: "Pengaduan", icon: FaComments },
  { id: "cctv", label: "CCTV", icon: FaVideo },
  { id: "pengaturan", label: "Pengaturan", icon: FaCog },
];

function AdminSidebar({ activePage, onNavigate, isOpen, onClose }) {
  const navigate = useNavigate();

  // ✅ FUNGSI LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari panel admin?");
    if (confirmLogout) {
      // Hapus data session (sesuaikan dengan yang kamu pakai)
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("token");
      sessionStorage.clear();

      // Redirect ke halaman login
      navigate("/"); // Ganti ke "/login" jika route login kamu berbeda
    }
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`admin-sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <FaLeaf />
          </div>
          <div>
            <h2>Desa Margalaksana</h2>
            <span>Admin Panel</span>
          </div>

          <button className="sidebar-close" onClick={onClose} aria-label="Tutup menu">
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-section-title">MENU UTAMA</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`sidebar-link ${activePage === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ✅ FOOTER: PROFIL + TOMBOL LOGOUT */}
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <div className="profile-info">
              <strong>Administrator</strong>
              <span>Admin Desa</span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;