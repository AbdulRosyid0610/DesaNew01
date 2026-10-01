import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/profil', label: 'Profil' },
    { path: '/peta', label: 'Peta' },
    { path: '/aparat', label: 'Aparat' },
    { path: '/statistik', label: 'Statistik' },
    { path: '/berita', label: 'Berita' },
    { path: '/umkm', label: 'UMKM' },
    { path: '/cctv', label: 'CCTV' },
    { path: '/layanan', label: 'Ajukan Layanan' },
  ];

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        {/* LOGO */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <i className="fas fa-mountain" style={styles.logoIconInner}></i>
          </div>
          <div style={styles.logoText}>
            <span style={styles.logoTitle}>Margalaksana</span>
            <span style={styles.logoSubtitle}>DESA • KABUPATEN</span>
          </div>
        </div>

        {/* MENU */}
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                ...styles.link,
                color: isActive ? '#f4d77c' : '#ffffff',
                borderBottom: isActive
                  ? '2px solid #d4af37'
                  : '2px solid transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}

          {/* TOMBOL LOGIN */}
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              ...styles.btnLogin,
              backgroundColor: isActive ? '#f4d77c' : 'transparent',
              color: isActive ? '#0f3d24' : '#ffffff',
            })}
          >
            <i className="fas fa-user-shield"></i> Login Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #0f3d24 0%, #1a5e3a 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: '14px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    // 🔥 UBAH INI: Dari 1200px menjadi 100% agar full width
    maxWidth: '100%', 
    margin: '0 auto',
    // 🔥 UBAH INI: Padding kiri dikurangi agar lebih mepet ke tepi
    padding: '0 16px', 
  },

  /* ===== LOGO ===== */
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    // 🔥 TAMBAHKAN INI: Untuk memastikan logo benar-benar di kiri
    marginLeft: '0', 
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #d4af37, #f4d77c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
  },
  logoIconInner: {
    color: '#0f3d24',
    fontSize: '20px',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.1,
  },
  logoTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: '1.35rem',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  logoSubtitle: {
    fontSize: '0.7rem',
    letterSpacing: '2px',
    color: '#f4d77c',
    fontWeight: 400,
    marginTop: '2px',
  },

  /* ===== NAV LINKS ===== */
  navLinks: {
    display: 'flex',
    gap: '22px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.92rem',
    transition: 'all 0.25s ease',
    paddingBottom: '4px',
    cursor: 'pointer',
    letterSpacing: '0.2px',
  },

  /* ===== TOMBOL LOGIN ===== */
  btnLogin: {
    border: '1.5px solid #d4af37',
    padding: '8px 20px',
    borderRadius: '40px',
    fontWeight: 600,
    transition: 'all 0.25s ease',
    fontSize: '0.88rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

export default Navbar;