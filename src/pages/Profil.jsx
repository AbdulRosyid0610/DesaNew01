import React from 'react'

const Profil = () => {
  const identitas = [
    { icon: 'fa-map-pin', label: 'Kecamatan:', value: 'Bungbulang' },
    { icon: 'fa-city', label: 'Kabupaten:', value: 'Garut' },
    { icon: 'fa-building', label: 'Provinsi:', value: 'Jawa Barat' },
    { icon: 'fa-flag', label: 'Kode Pos:', value: '44165' },
    { icon: 'fa-phone', label: 'Telepon:', value: '(0265) 123456' },
    { icon: 'fa-envelope', label: 'Email:', value: 'desamargalaksana@gmail.com' },
    { icon: 'fa-globe', label: 'Website:', value: 'www.margalaksana.go.id' },
    { icon: 'fa-calendar-alt', label: 'Tahun Berdiri:', value: '1975' },
  ]

  const batas = [
    { arah: 'Utara', desa: 'Desa Sukamulya', icon: 'fa-arrow-up', color: '#d4af37' },
    { arah: 'Selatan', desa: 'Desa Cipanas', icon: 'fa-arrow-down', color: '#2d8a5a' },
    { arah: 'Barat', desa: 'Desa Cikawung', icon: 'fa-arrow-left', color: '#d4af37' },
    { arah: 'Timur', desa: 'Desa Cibitung', icon: 'fa-arrow-right', color: '#2d8a5a' },
  ]

  return (
    <section className="page-section">
      {/* ===== HEADER PROFIL (HIJAU ELEGAN) ===== */}
      <div style={styles.profilHero}>
        <h2 style={styles.profilHeroTitle}>
          <i className="fas fa-landmark" style={{ marginRight: '12px', color: '#d4af37' }}></i>
          Profil Desa Margalaksana
        </h2>
        <p style={styles.profilHeroDesc}>
          Desa yang berkomitmen pada kemandirian energi, kelestarian lingkungan, dan kesejahteraan masyarakat.
        </p>
      </div>

      <h3 style={styles.sectionHeading}>
        <i className="fas fa-id-card" style={{ color: '#1a5e3a' }}></i> Identitas Wilayah
      </h3>
      <div style={styles.infoGrid}>
        {identitas.map((item, index) => (
          <div key={index} style={styles.infoItem}>
            <i className={`fas ${item.icon}`} style={{ color: '#1a5e3a' }}></i>
            <span><span style={styles.label}>{item.label}</span> {item.value}</span>
          </div>
        ))}
      </div>

      <h3 style={styles.sectionHeading}>
        <i className="fas fa-border-all" style={{ color: '#1a5e3a' }}></i> Batas Wilayah Administratif
      </h3>
      <div className="grid-4col" style={{ marginBottom: '30px' }}>
        {batas.map((item, index) => (
          <div key={index} className="card" style={{ textAlign: 'center', padding: '20px 12px' }}>
            <i className={`fas ${item.icon}`} style={{ fontSize: '2rem', color: item.color }}></i>
            <h4>{item.arah}</h4>
            <p style={{ fontSize: '0.95rem', color: '#3e576b' }}>{item.desa}</p>
          </div>
        ))}
      </div>

      <h3 style={styles.sectionHeading}>
        <i className="fas fa-ruler-combined" style={{ color: '#1a5e3a' }}></i> Luas & Potensi Wilayah
      </h3>
      <div className="grid-2col" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ borderLeft: '6px solid #1a5e3a' }}>
          <i className="fas fa-arrows-alt" style={{ color: '#d4af37' }}></i>
          <h3>Luas Wilayah</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a5e3a' }}>1.240 Ha</p>
          <div style={{ marginTop: '12px' }}>
            <div style={styles.luasItem}><span>Lahan Pertanian</span><span style={{ fontWeight: 600 }}>520 Ha</span></div>
            <div style={styles.luasItem}><span>Pemukiman</span><span style={{ fontWeight: 600 }}>180 Ha</span></div>
            <div style={styles.luasItem}><span>Hutan & Konservasi</span><span style={{ fontWeight: 600 }}>340 Ha</span></div>
            <div style={{ ...styles.luasItem, borderBottom: 'none' }}><span>Fasilitas Umum</span><span style={{ fontWeight: 600 }}>200 Ha</span></div>
          </div>
        </div>
        <div className="card" style={{ borderLeft: '6px solid #d4af37' }}>
          <i className="fas fa-bolt" style={{ color: '#1a5e3a' }}></i>
          <h3>Potensi Wilayah</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '8px' }}>
            <li style={styles.potensiItem}><i className="fas fa-sun" style={{ color: '#d4af37' }}></i> Energi Surya: 5.2 kWh/m²/hari</li>
            <li style={styles.potensiItem}><i className="fas fa-wind" style={{ color: '#1a5e3a' }}></i> Energi Angin: 6.5 m/s (rata-rata)</li>
            <li style={styles.potensiItem}><i className="fas fa-seedling" style={{ color: '#4caf50' }}></i> Lahan Organik: 800 meter</li>
            <li style={styles.potensiItem}><i className="fas fa-water" style={{ color: '#2196f3' }}></i> Sumber Air: 2 mata air utama</li>
            <li style={{ ...styles.potensiItem, borderBottom: 'none' }}><i className="fas fa-tree" style={{ color: '#4caf50' }}></i> Wisata Alam: Hutan pinus & bendungan pedesaan tradisional Sunda Air Terjun.</li>
          </ul>
        </div>
      </div>

      <h3 style={styles.sectionHeading}>
        <i className="fas fa-scroll" style={{ color: '#1a5e3a' }}></i> Sejarah Desa
      </h3>
      <div style={styles.sejarahBox}>
        <p style={{ marginBottom: '16px' }}>
          Secara historis, Desa Margalaksana merupakan hasil pemekaran wilayah.
          Pada sekitar tahun 1970-an, wilayah Desa Bungbulang mengalami pemekaran untuk meningkatkan efektivitas pelayanan publik, pemerataan pembangunan, serta mendekatkan akses administrasi kepada masyarakat.
          Dari pemekaran tersebut, lahirlah beberapa desa otonom baru, di antaranya Desa Hanjuang, Desa Margalaksana, dan Desa Cijayana.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <span style={styles.badgeGold}><i className="fas fa-calendar"></i> 1975 - Didirikan</span>
          <span style={styles.badgeGreen}><i className="fas fa-solar-panel"></i> 2010 - PLTS perdana</span>
          <span style={styles.badgeGold}><i className="fas fa-wind"></i> 2015 - Kincir angin</span>
          <span style={styles.badgeGreen}><i className="fas fa-award"></i> 2020 - Desa mandiri energi</span>
          <span style={styles.badgeGold}><i className="fas fa-trophy"></i> 2023 - Percontohan nasional</span>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ borderLeft: '6px solid #1a5e3a' }}>
          <i className="fas fa-bullseye" style={{ color: '#d4af37' }}></i>
          <h3>Visi</h3>
          <p>“Terwujudnya Masyarakat Desa yang Maju, Mandiri, Sejahtera, Transparan, dan Berakhlak Mulia Berlandaskan Kearifan Lokal.”</p>
        </div>
        <div className="card" style={{ borderLeft: '6px solid #d4af37' }}>
          <i className="fas fa-list-check" style={{ color: '#1a5e3a' }}></i>
          <h3>Misi</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '8px' }}>
            <li style={{ marginBottom: '6px' }}>✅ Pemerintahan yang Akuntabel: Meningkatkan kualitas penyelenggaraan pemerintahan desa yang bersih, transparan, cepat, dan bertanggung jawab dalam melayani masyarakat.</li>
            <li style={{ marginBottom: '6px' }}>✅ Pembangunan Infrastruktur: Meningkatkan pemerataan pembangunan sarana dan prasarana dasar (seperti jalan, jembatan, dan fasilitas umum) yang menunjang perekonomian warga.</li>
            <li style={{ marginBottom: '6px' }}>✅ Pemberdayaan Ekonomi: Mengoptimalkan potensi lokal melalui pengembangan sektor pertanian, perkebunan, UMKM, serta penguatan Badan Usaha Milik Desa (BUMDes).</li>
            <li style={{ marginBottom: '6px' }}>✅ Peningkatan Kualitas SDM: Meningkatkan taraf kesehatan dan pendidikan masyarakat desa guna menciptakan sumber daya manusia yang berdaya saing.</li>
          </ul>
        </div>
      </div>

      <div style={styles.penghargaanBox}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f3d24' }}>
          <i className="fas fa-trophy" style={{ color: '#d4af37' }}></i> Penghargaan & Sertifikasi
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
          <span style={styles.badgeGold}>🏆 Desa Mandiri Energi 2023</span>
          <span style={styles.badgeGreen}>🌱 Sertifikasi Eko-Desa 2024</span>
          <span style={styles.badgeGold}>💡 Inovasi Hijau 2025</span>
        </div>
      </div>
    </section>
  )
}

const styles = {
  /* ===== HEADER PROFIL HIJAU ===== */
  profilHero: {
    background: 'linear-gradient(135deg, #0f3d24 0%, #1a5e3a 100%)',
    borderRadius: 'var(--radius)',
    padding: '50px 40px',
    marginBottom: '40px',
    borderLeft: '6px solid #d4af37',
    boxShadow: '0 8px 30px rgba(15, 61, 36, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  profilHeroTitle: {
    fontSize: '2rem',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  profilHeroDesc: {
    fontSize: '1.15rem',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
    maxWidth: '750px',
  },

  /* ===== SECTION HEADING ===== */
  sectionHeading: {
    fontSize: '1.6rem',
    marginBottom: '16px',
    color: '#0f3d24',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  /* ===== INFO GRID ===== */
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    background: 'white',
    padding: '24px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    marginBottom: '30px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
    borderBottom: '1px solid #f0f4f8',
  },
  label: {
    fontWeight: 600,
    color: '#3e576b',
    marginRight: '4px',
  },

  /* ===== LUAS & POTENSI ===== */
  luasItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ecf3f8',
    padding: '6px 0',
  },
  potensiItem: {
    padding: '8px 0',
    borderBottom: '1px solid #ecf3f8',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  /* ===== SEJARAH ===== */
  sejarahBox: {
    background: 'white',
    borderRadius: 'var(--radius)',
    padding: '28px 30px',
    boxShadow: 'var(--shadow)',
    marginBottom: '30px',
  },

  /* ===== PENGHARGAAN ===== */
  penghargaanBox: {
    background: 'linear-gradient(135deg, #f4d77c 0%, #faf8f0 100%)',
    borderRadius: 'var(--radius)',
    padding: '24px 28px',
    marginTop: '10px',
    borderLeft: '6px solid #d4af37',
  },

  /* ===== BADGES ===== */
  badgeGold: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #d4af37, #f4d77c)',
    color: '#0f3d24',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: 600,
    boxShadow: '0 3px 10px rgba(212, 175, 55, 0.3)',
  },
  badgeGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #1a5e3a, #2d8a5a)',
    color: '#ffffff',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: 600,
    boxShadow: '0 3px 10px rgba(26, 94, 58, 0.3)',
  },
}

export default Profil