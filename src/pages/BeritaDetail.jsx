import React from "react";
import { useParams, Link } from "react-router-dom";

const BeritaDetail = () => {
  const { id } = useParams();

  // Data dummy (nanti bisa diganti ambil dari API/database)
  const berita = {
    id: id,
    title: "Festival Budaya Desa Margalaksana",
    date: "20 Juli 2026",
    image: "https://via.placeholder.com/800x400",
    content: "Ini adalah isi lengkap berita. Masyarakat desa sangat antusias mengikuti festival budaya tahunan yang diadakan di lapangan desa. Berbagai pertunjukan seni, pameran UMKM, dan bazar kuliner lokal memeriahkan acara ini."
  };

  return (
    <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/berita" style={{ color: "#1a5e3a", textDecoration: "none", fontWeight: "bold", marginBottom: "20px", display: "inline-block" }}>
        ← Kembali ke Berita
      </Link>
      <h1 style={{ fontSize: "2.5rem", color: "#0f3d24", marginBottom: "10px" }}>{berita.title}</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>📅 {berita.date}</p>
      <img src={berita.image} alt={berita.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "30px" }} />
      <div style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "#333" }}>
        {berita.content}
      </div>
    </section>
  );
};

export default BeritaDetail;