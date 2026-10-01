import React from "react";
import { useParams, Link } from "react-router-dom";
import { umkmData } from "../Data/umkmData";

const UmkmDetail = () => {
  const { id } = useParams();
  const produk = umkmData.find((item) => item.id === parseInt(id));

  if (!produk) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>Produk tidak ditemukan</h2>
        <Link to="/umkm" style={{ color: "#0ea5e9", fontWeight: 600 }}>
          ← Kembali ke UMKM
        </Link>
      </div>
    );
  }

  return (
    <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <Link
        to="/umkm"
        style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: "20px" }}
      >
        ← Kembali ke UMKM
      </Link>

      <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        <img src={produk.foto} alt={produk.nama} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        <div style={{ padding: "30px" }}>
          <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "5px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
            {produk.kategori.toUpperCase()}
          </span>
          <span style={{ background: produk.badgeColor, color: "#0f172a", padding: "5px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, marginLeft: "10px" }}>
            {produk.badge}
          </span>

          <h1 style={{ fontSize: "2rem", color: "#0f172a", margin: "16px 0" }}>{produk.nama}</h1>
          <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: 1.7 }}>{produk.deskripsi}</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0ea5e9", marginTop: "20px" }}>{produk.harga}</p>
        </div>
      </div>
    </section>
  );
};

export default UmkmDetail;