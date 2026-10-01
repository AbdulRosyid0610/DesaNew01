import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { umkmData, kategoriFilter } from "../Data/umkmData";

const Umkm = () => {
  const [selectedKategori, setSelectedKategori] = useState('Semua')

  const filteredData = selectedKategori === 'Semua'
    ? umkmData
    : umkmData.filter(item => item.kategori === selectedKategori)

  const getKategoriColor = (kategori) => {
    const colors = {
      'Kerajinan': '#fce4ec',
      'Minuman': '#e3f2fd',
      'Pakaian': '#e8f5e9',
      'Makanan': '#fff3e0',
      'Energi': '#e0f7fa',
      'Pertanian': '#f1f8e9',
      'Camilan': '#fef3c7',
      'Hasil Bumi': '#dcfce7',
    }
    return colors[kategori] || '#e8edf2'
  }

  const getKategoriTextColor = (kategori) => {
    const colors = {
      'Kerajinan': '#c62828',
      'Minuman': '#0d47a1',
      'Pakaian': '#2e7d32',
      'Makanan': '#e65100',
      'Energi': '#00695c',
      'Pertanian': '#33691e',
      'Camilan': '#92400e',
      'Hasil Bumi': '#166534',
    }
    return colors[kategori] || '#546e7a'
  }

  return (
    <>
      <style>{`
        .page-section:has(.umkm-page) {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>

      <section className="page-section umkm-page">
        {/* HEADER HIJAU */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f3d24 0%, #155b37 55%, #17633d 100%)",
            borderLeft: "6px solid #d4af37",
            boxShadow: "0 8px 25px rgba(15, 61, 36, 0.18)",
            padding: "58px 48px 52px",
            marginTop: "0px",
            marginBottom: "44px",
            width: "100vw",
            maxWidth: "100vw",
            marginLeft: 0,
            boxSizing: "border-box",
            position: "relative",
            minHeight: "230px",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "34px",
              fontWeight: 700,
              margin: "0 0 16px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              lineHeight: 1.2,
              letterSpacing: "-0.3px",
            }}
          >
            <i
              className="fas fa-store"
              style={{ color: "#d4af37", width: "32px", fontSize: "29px", textAlign: "center", flexShrink: 0 }}
            ></i>
            Produk &amp; Sentra UMKM
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.93)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "850px",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Dukung produk lokal unggulan hasil karya warga dan kelompok usaha Desa Margalaksana
          </p>
        </div>

        {/* FILTER KATEGORI */}
        <div style={styles.filterGroup}>
          {kategoriFilter.map((kategori) => (
            <span
              key={kategori}
              style={{
                ...styles.filterBtn,
                background: selectedKategori === kategori ? 'var(--sky)' : 'white',
                color: selectedKategori === kategori ? 'white' : '#1e2b3a',
                borderColor: selectedKategori === kategori ? 'var(--sky)' : '#d9eaf2',
              }}
              onClick={() => setSelectedKategori(kategori)}
            >
              {kategori}
            </span>
          ))}
        </div>

        {/* GRID PRODUK */}
        <div style={styles.umkmGrid}>
          {filteredData.map((item, index) => (
            <div key={index} style={styles.umkmCard}>
              <div style={styles.imageWrapper}>
                <img src={item.foto} alt={item.nama} style={styles.image} />
              </div>

              <div style={styles.cardBody}>
                <span style={{ ...styles.kategori, background: getKategoriColor(item.kategori), color: getKategoriTextColor(item.kategori) }}>
                  {item.kategori}
                </span>
                <span style={{ ...styles.badgeVerif, background: item.badgeColor }}>{item.badge}</span>
                <div style={styles.namaProduk}>{item.nama}</div>
                <div style={styles.deskripsi}>{item.deskripsi}</div>
                <div style={styles.harga}>{item.harga}</div>

                <Link to={`/umkm/${item.id}`} style={styles.linkDetail}>
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const styles = {
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '30px',
  },
  filterBtn: {
    padding: '6px 20px',
    borderRadius: '40px',
    fontWeight: 500,
    border: '1px solid #d9eaf2',
    cursor: 'pointer',
    transition: '0.2s',
  },
  umkmGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },
  umkmCard: {
    background: 'white',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(110, 200, 230, 0.1)',
    transition: '0.25s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: '#e8edf2',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardBody: {
    padding: '24px 28px 24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
  },
  kategori: {
    display: 'inline-block',
    fontWeight: 600,
    fontSize: '0.8rem',
    padding: '3px 14px',
    borderRadius: '40px',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    alignSelf: 'flex-start',
  },
  badgeVerif: {
    position: 'absolute',
    top: '24px',
    right: '20px',
    fontSize: '0.7rem',
    padding: '3px 12px',
    borderRadius: '40px',
    fontWeight: 600,
    color: '#7a5f1a',
  },
  namaProduk: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#1e2b3a',
  },
  deskripsi: {
    color: '#455a64',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    marginBottom: '14px',
    flex: 1,
  },
  harga: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--sky)',
    marginBottom: '16px',
  },
  linkDetail: {
    color: 'var(--sky)',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: '0.2s',
    fontSize: '0.95rem',
    alignSelf: 'flex-start',
  },
}

export default Umkm