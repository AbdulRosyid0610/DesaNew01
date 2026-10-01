import React from 'react'

const cctvData = [
  { id: 'CAM 01', name: 'Balai Desa', location: 'Jl. Margalaksana No. 1', desc: 'Pemantauan area depan balai desa dan halaman utama.', status: 'LIVE' },
  { id: 'CAM 02', name: 'Taman Surya', location: 'Jl. Kenanga, RT 03', desc: 'Memantau area taman publik dan fasilitas olahraga desa.', status: 'LIVE' },
  { id: 'CAM 03', name: 'Pasar Hijau', location: 'Jl. Pasar Sentral', desc: 'Pemantauan aktivitas pasar tradisional dan pusat UMKM desa.', status: 'LIVE' },
  { id: 'CAM 04', name: 'PLTS Pusat', location: 'Jl. Energi, Dusun Mandiri', desc: 'Monitoring area pembangkit listrik tenaga surya utama desa.', status: 'LIVE' },
  { id: 'CAM 05', name: 'Pintu Gerbang Utama', location: 'Jl. Raya Margalaksana', desc: 'Akses masuk utama desa. Sedang dalam perbaikan sistem.', status: 'OFFLINE' },
  { id: 'CAM 06', name: 'Lapangan Desa', location: 'Jl. Olahraga No. 5', desc: 'Pemantauan lapangan serbaguna dan area kegiatan warga.', status: 'LIVE' },
  { id: 'CAM 07', name: 'Pos Kamling', location: 'Jl. Mawar, RT 05', desc: 'Monitoring pos keamanan lingkungan dan area sekitarnya.', status: 'LIVE' },
  { id: 'CAM 08', name: 'Bendungan Hijau', location: 'Dusun Cikawung', desc: 'Pemantauan area bendungan dan irigasi pertanian.', status: 'OFFLINE' },
]

const Cctv = () => {
  const onlineCount = cctvData.filter(c => c.status === 'LIVE').length
  const offlineCount = cctvData.filter(c => c.status === 'OFFLINE').length

  return (
    <>
      {/* =========================================
          STYLE KHUSUS AGAR HEADER NEMPEL KE ATAS
      ========================================= */}
      <style>{`
        .page-section:has(.cctv-page) {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>

      <section className="page-section cctv-page">

        {/* =========================================
            HEADER HIJAU ELEGAN
        ========================================= */}
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
              className="fas fa-video"
              style={{ color: "#d4af37", width: "32px", fontSize: "29px", textAlign: "center", flexShrink: 0 }}
            ></i>
            Pemantauan CCTV Publik
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
            Pantau keamanan dan aktivitas di berbagai titik strategis Desa Margalaksana secara real-time
          </p>
        </div>

        {/* =========================================
            STATISTIK CCTV
        ========================================= */}
        <div style={styles.cctvStats}>
          <div style={styles.cctvStatItem}>
            <i className="fas fa-video" style={{ fontSize: '1.6rem', color: 'var(--sky)' }}></i>
            <div style={styles.statInfo}><span style={styles.statNumber}>{cctvData.length}</span><span style={styles.statLabel}>Total Kamera</span></div>
          </div>
          <div style={styles.cctvStatItem}>
            <i className="fas fa-circle" style={{ color: '#4caf50', fontSize: '1.2rem' }}></i>
            <div style={styles.statInfo}><span style={styles.statNumber}>{onlineCount}</span><span style={styles.statLabel}>Online</span></div>
          </div>
          <div style={styles.cctvStatItem}>
            <i className="fas fa-circle" style={{ color: '#ef5350', fontSize: '1.2rem' }}></i>
            <div style={styles.statInfo}><span style={styles.statNumber}>{offlineCount}</span><span style={styles.statLabel}>Offline</span></div>
          </div>
          <div style={styles.cctvStatItem}>
            <i className="fas fa-clock" style={{ color: '#f9d342', fontSize: '1.6rem' }}></i>
            <div style={styles.statInfo}><span style={styles.statNumber}>24/7</span><span style={styles.statLabel}>Monitoring</span></div>
          </div>
        </div>

        {/* =========================================
            GRID CCTV
        ========================================= */}
        <div style={styles.cctvGrid}>
          {cctvData.map((cctv, index) => (
            <div key={index} style={styles.cctvCard}>
              <div style={styles.cctvPreview}>
                <div style={{ ...styles.statusBadge, color: cctv.status === 'LIVE' ? '#4caf50' : '#ef5350' }}>
                  <span style={{ ...styles.dot, background: cctv.status === 'LIVE' ? '#4caf50' : '#ef5350', animation: cctv.status === 'LIVE' ? 'pulse-dot 1.5s infinite' : 'none' }}></span>
                  {cctv.status}
                </div>
                <div style={styles.cameraIcon}><i className="fas fa-video"></i></div>
                <div style={styles.cameraLabel}>{cctv.id}</div>
                <div style={styles.timestamp}>{cctv.status === 'LIVE' ? '2026-09-04 14:23:45' : '--:--:--'}</div>
              </div>
              <div style={styles.cctvInfo}>
                <div style={styles.cctvName}>{cctv.name}</div>
                <div style={styles.cctvLocation}><i className="fas fa-map-marker-alt"></i> {cctv.location}</div>
                <div style={styles.cctvDesc}>{cctv.desc}</div>
                <div style={styles.cctvActions}>
                  {cctv.status === 'LIVE' ? (
                    <>
                      <span style={{ ...styles.btnCctv, ...styles.btnPrimary }}><i className="fas fa-play"></i> Live View</span>
                      <span style={{ ...styles.btnCctv, ...styles.btnOutline }}><i className="fas fa-expand"></i> Fullscreen</span>
                    </>
                  ) : (
                    <span style={{ ...styles.btnCctv, ...styles.btnOutline, opacity: 0.5 }}><i className="fas fa-wrench"></i> Maintenance</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const styles = {
  cctvStats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '35px',
    background: 'white',
    padding: '20px 28px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(110, 200, 230, 0.1)',
  },
  cctvStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  statNumber: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#1e2b3a',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#78909c',
  },
  cctvGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
  cctvCard: {
    background: 'white',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(110, 200, 230, 0.1)',
    transition: '0.3s ease',
  },
  cctvPreview: {
    background: 'linear-gradient(145deg, #1a2a36, #0d1a24)',
    padding: '40px 20px 30px',
    textAlign: 'center',
    position: 'relative',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: '3.6rem',
    color: 'rgba(255, 255, 255, 0.25)',
    marginBottom: '12px',
  },
  statusBadge: {
    position: 'absolute',
    top: '14px',
    right: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    padding: '4px 12px',
    borderRadius: '40px',
    fontSize: '0.7rem',
    fontWeight: 600,
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  cameraLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '0.7rem',
    marginTop: '8px',
    fontFamily: 'Courier New, monospace',
  },
  cctvInfo: {
    padding: '20px 24px 24px',
  },
  cctvName: {
    fontSize: '1.15rem',
    fontWeight: 700,
    marginBottom: '4px',
    color: '#1e2b3a',
  },
  cctvLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#78909c',
    fontSize: '0.9rem',
    marginBottom: '12px',
  },
  cctvDesc: {
    color: '#546e7a',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    marginBottom: '14px',
  },
  cctvActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  btnCctv: {
    padding: '6px 18px',
    borderRadius: '40px',
    fontSize: '0.8rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'default',
    transition: '0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  btnPrimary: {
    background: 'var(--sky)',
    color: 'white',
  },
  btnOutline: {
    background: 'transparent',
    border: '1.5px solid #d9eaf2',
    color: '#546e7a',
  },
}

export default Cctv