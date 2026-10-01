import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./layout/Navbar";

// Halaman
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Peta from "./pages/Peta";
import Aparat from "./pages/Aparat";
import Statistik from "./pages/Statistik";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";
import Umkm from "./pages/Umkm";                       // <-- Import Umkm
import UmkmDetail from "./pages/UmkmDetail";           // <-- Import UmkmDetail (BARU)
import CCTV from "./pages/CCTV";
import Layanan from "./pages/Layanan";
import Login from "./pages/Login/Login";

// Admin
import AdminDashboard from "./Admin/AdminDashboard";

function App() {
  const location = useLocation();

  // Navbar tidak ditampilkan di halaman Login dan Admin
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  return (
    <HelmetProvider>
      {/* Navbar hanya untuk website utama */}
      {!isAdminPage && !isLoginPage && <Navbar />}

      <Routes>
        {/* =========================
            WEBSITE DESA
        ========================= */}

        <Route path="/" element={<Beranda />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/peta" element={<Peta />} />
        <Route path="/aparat" element={<Aparat />} />
        <Route path="/statistik" element={<Statistik />} />

        {/* =========================
            BERITA
        ========================= */}
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />

        {/* =========================
            UMKM
        ========================= */}
        <Route path="/umkm" element={<Umkm />} />
        <Route path="/umkm/:id" element={<UmkmDetail />} />   {/* <-- BARU */}

        {/* =========================
            HALAMAN LAIN
        ========================= */}
        <Route path="/cctv" element={<CCTV />} />
        <Route path="/layanan" element={<Layanan />} />

        {/* =========================
            LOGIN
        ========================= */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            ADMIN DASHBOARD
        ========================= */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;