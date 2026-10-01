import { useState, useEffect } from "react";
import {
  FaUsers,
  FaStore,
  FaNewspaper,
  FaComments,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";
import "./AdminDashboard.css";

// Aktivitas dummy (tetap karena belum ada tabel log aktivitas)
const activities = [
  { text: "Data warga baru ditambahkan", time: "10 menit lalu" },
  { text: "UMKM Kopi Margalaksana diperbarui", time: "35 menit lalu" },
  { text: "Berita baru dipublikasikan", time: "1 jam lalu" },
  { text: "Pengaduan baru masuk", time: "2 jam lalu" },
];

function Dashboard() {
  const [statsData, setStatsData] = useState({
    warga: { total: 0 },
    umkm: { aktif: 0 },
    berita: { total: 0 },
    pengaduan: { total: 0 },
  });

  // ✅ AMBIL STATISTIK DARI BACKEND
  const ambilStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/stats");
      if (!response.ok) throw new Error("Gagal mengambil statistik");
      const result = await response.json();
      setStatsData(result);
    } catch (error) {
      console.error("Gagal ambil statistik dashboard:", error);
    }
  };

  useEffect(() => {
    ambilStats();
  }, []);

  // ✅ Susun array statistik dari data backend
  const stats = [
    {
      title: "Total Warga",
      value: statsData.warga.total.toLocaleString("id-ID"),
      change: "+5.2%",
      icon: FaUsers,
    },
    {
      title: "UMKM Aktif",
      value: statsData.umkm.aktif.toLocaleString("id-ID"),
      change: "+8.4%",
      icon: FaStore,
    },
    {
      title: "Total Berita",
      value: statsData.berita.total.toLocaleString("id-ID"),
      change: "+3.1%",
      icon: FaNewspaper,
    },
    {
      title: "Pengaduan",
      value: statsData.pengaduan.total.toLocaleString("id-ID"),
      change: "+2.7%",
      icon: FaComments,
    },
  ];

  return (
    <div className="page-container">
      <div className="welcome-card">
        <div>
          <span>Selamat datang </span>
          <h2>Admin Desa Margalaksana</h2>
          <p>Kelola informasi dan pelayanan desa melalui dashboard ini.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-icon"><Icon /></div>
              <div className="stat-info">
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <small><FaArrowUp /> {stat.change} bulan ini</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Aktivitas Terbaru</h3>
              <p>Aktivitas yang terjadi di sistem</p>
            </div>
            <button className="text-button">Lihat semua <FaArrowRight /></button>
          </div>

          <div className="activity-list">
            {activities.map((item, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-dot" />
                <div>
                  <strong>{item.text}</strong>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel quick-panel">
          <div className="panel-header">
            <div>
              <h3>Akses Cepat</h3>
              <p>Menu yang sering digunakan</p>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={() => alert("Form tambah warga dapat dihubungkan ke API.")}>
              <FaUsers /> Tambah Warga
            </button>
            <button onClick={() => alert("Form tambah UMKM dapat dihubungkan ke API.")}>
              <FaStore /> Tambah UMKM
            </button>
            <button onClick={() => alert("Form tambah berita dapat dihubungkan ke API.")}>
              <FaNewspaper /> Tambah Berita
            </button>
            <button onClick={() => alert("Halaman pengaduan dibuka dari menu Pengaduan.")}>
              <FaComments /> Cek Pengaduan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;