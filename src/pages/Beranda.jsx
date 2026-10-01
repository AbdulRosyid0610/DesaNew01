import React from 'react';

const Beranda = () => {
  const stats = [
   
  ];

  return (
    <div className="beranda-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');

        .beranda-wrapper {
          --primary: #1a5e3a;
          --primary-dark: #0f3d24;
          --primary-light: #2d8a5a;
          --gold: #d4af37;
          --gold-light: #f4d77c;
          --cream: #faf8f0;
          --dark: #1a1a1a;
          font-family: 'Poppins', sans-serif;
          background: var(--cream);
          color: var(--dark);
          overflow-x: hidden;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }

        .beranda-wrapper * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* ===== HERO SECTION ===== */
        .bn-hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 60px;
          overflow: hidden;
          background: linear-gradient(135deg, #0f3d24 0%, #1a5e3a 50%, #2d8a5a 100%);
        }

        .bn-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600') center/cover;
          opacity: 0.25;
          z-index: 0;
        }

        .bn-ornament {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
        }

        .bn-ornament.one {
          top: -100px;
          right: -100px;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%);
        }

        .bn-ornament.two {
          bottom: -120px;
          left: -80px;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%);
        }

        .bn-hero-content {
          position: relative;
          z-index: 3;
          max-width: 750px;
          color: #fff;
          animation: bnFadeUp 1s ease;
        }

        @keyframes bnFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bn-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.4);
          border-radius: 30px;
          color: var(--gold-light);
          font-size: 13px;
          letter-spacing: 1px;
          margin-bottom: 25px;
          backdrop-filter: blur(10px);
        }

        .bn-hero-badge i { color: var(--gold); }

        .bn-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 68px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 22px;
          letter-spacing: -1px;
        }

        .bn-hero h1 .highlight {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
        }

        .bn-hero p {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          margin-bottom: 40px;
          max-width: 580px;
          line-height: 1.8;
        }

        .bn-hero-buttons {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .bn-btn {
          padding: 15px 34px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-family: 'Poppins', sans-serif;
        }

        .bn-btn-primary {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--primary-dark);
          box-shadow: 0 8px 25px rgba(212,175,55,0.4);
        }

        .bn-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(212,175,55,0.6);
        }

        .bn-btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.4);
        }

        .bn-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--gold);
          color: var(--gold-light);
        }

        .bn-hero-stats {
          position: absolute;
          bottom: 60px;
          right: 60px;
          z-index: 3;
          display: flex;
          gap: 40px;
          animation: bnFadeUp 1.2s ease;
        }

        .bn-stat-item {
          text-align: center;
          color: #fff;
        }

        .bn-stat-item h3 {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--gold-light);
          line-height: 1;
        }

        .bn-stat-item p {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 6px;
          color: rgba(255,255,255,0.7);
        }

        @media (max-width: 968px) {
          .bn-hero { padding: 0 25px; }
          .bn-hero h1 { font-size: 42px; }
          .bn-hero p { font-size: 16px; }
          .bn-hero-stats {
            position: static;
            margin-top: 50px;
            gap: 25px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .bn-hero h1 { font-size: 34px; }
          .bn-hero-buttons { flex-direction: column; }
          .bn-btn { justify-content: center; }
          .bn-stat-item h3 { font-size: 30px; }
        }
      `}</style>

      {/* ===== HERO / BERANDA ===== */}
      <section className="bn-hero">
        <div className="bn-ornament one"></div>
        <div className="bn-ornament two"></div>

        <div className="bn-hero-content">
          <div className="bn-hero-badge">
            <i className="fas fa-leaf"></i>
            <span>SELAMAT DATANG DI WEBSITE RESMI</span>
          </div>

          <h1>
            Desa <span className="highlight">Margalaksana</span>
            <br />
            Yang Asri Berdaya
          </h1>

          <p>
            Membangun desa yang maju, mandiri, dan sejahtera melalui pelayanan
            digital yang transparan, partisipatif, dan berkelanjutan untuk seluruh
            warga.
          </p>

          <div className="bn-hero-buttons">
            <a href="#" className="bn-btn bn-btn-primary">
              <i className="fas fa-compass"></i> Jelajahi Desa
            </a>
            <a href="#" className="bn-btn bn-btn-outline">
              <i className="fas fa-headset"></i> Layanan Warga
            </a>
          </div>
        </div>

        <div className="bn-hero-stats">
          {stats.map((stat, idx) => (
            <div className="bn-stat-item" key={idx}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Beranda;