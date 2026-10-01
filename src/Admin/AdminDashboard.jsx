import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import DataWarga from "./DataWarga";
import UMKM from "./UMKM";
import Berita from "./Berita";
import Pengaduan from "./Pengaduan";
import CCTV from "./CCTV";
import Pengaturan from "./Pengaturan";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    dashboard: <Dashboard />,
    warga: <DataWarga />,
    umkm: <UMKM />,
    berita: <Berita />,
    pengaduan: <Pengaduan />,
    cctv: <CCTV />,
    pengaturan: <Pengaturan />,
  };

  const pageTitles = {
    dashboard: "Dashboard",
    warga: "Data Warga",
    umkm: "Kelola UMKM",
    berita: "Kelola Berita",
    pengaduan: "Pengaduan",
    cctv: "CCTV",
    pengaturan: "Pengaturan",
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">
        <AdminHeader
          title={pageTitles[activePage]}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="admin-content">
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
