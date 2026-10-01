import React from "react";

// =========================================================
// ARRAY WARNA OTOMATIS (VERSI HIJAU-EMAS)
// =========================================================
const warnaOtomatis = [
  "1a5e3a", // Hijau Tua
  "2d8a5a", // Hijau Medium
  "d4af37", // Emas
  "0f3d24", // Hijau Gelap
  "4ec88a", // Hijau Mint
  "f4d77c", // Emas Muda
  "1a5e3a", // Hijau Tua
  "2d8a5a", // Hijau Medium
  "d4af37", // Emas
  "0f3d24", // Hijau Gelap
  "4ec88a", // Hijau Mint
  "f4d77c", // Emas Muda
];

// =========================================================
// DATA APARAT DESA (DENGAN FOTO)
// =========================================================
const aparatData = [
  {
    name: "Ixsan Sugianto",
    position: "Kepala Desa",
    period: "2017 - 2026",
    phone: "0812-0000-0001",
    email: "kepaladesa@desamargalaksana.id",
    initials: "IS",
    // Ganti URL di bawah ini dengan path foto asli Anda, contoh: "/images/aparat/ixsan.jpg"
    photo: "https://i.pravatar.cc/300?img=11", 
  },
  {
    name: "Zaenal Mutakin",
    position: "Sekretaris Desa",
    period: "2024 - 2030",
    phone: "0812-0000-0002",
    email: "sekretaris@desamargalaksana.id",
    initials: "ZM",
    photo: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Cevi Badru Tamam Nurul Syam",
    position: "Kaur Keuangan",
    period: "2024 - 2030",
    phone: "0812-0000-0003",
    email: "pembangunan@desamargalaksana.id",
    initials: "CS",
    photo: "https://i.pravatar.cc/300?img=13",
  },
  {
    name: "Dede Maryati",
    position: "Kaur Umum & T.U",
    period: "2024 - 2030",
    phone: "0812-0000-0004",
    email: "kesejahteraan@desamargalaksana.id",
    initials: "DM",
    photo: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Adam Al Farisi Priyatna, S.Kom",
    position: "Kaur Perencanaan",
    period: "2024 - 2030",
    phone: "0812-0000-0005",
    email: "pemerintahan@desamargalaksana.id",
    initials: "AS",
    photo: "https://i.pravatar.cc/300?img=14",
  },
  {
    name: "Nuraliman",
    position: "Kasi Pemerintahan",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "NR",
    photo: "https://i.pravatar.cc/300?img=15",
  },
  {
    name: "Ai Astuti",
    position: "Kasi Kesejahteraan",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "AA",
    photo: "https://i.pravatar.cc/300?img=9",
  },
  {
    name: "Heryandi",
    position: "Kasi Pelayanan",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "HY",
    photo: "https://i.pravatar.cc/300?img=16",
  },
  {
    name: "Yusep Nurhikmat",
    position: "Kepala Dusun 1",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "YN",
    photo: "https://i.pravatar.cc/300?img=17",
  },
  {
    name: "Wawan Abdurahman Al Rasyid",
    position: "Kepala Dusun 2",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "WA",
    photo: "https://i.pravatar.cc/300?img=18",
  },
  {
    name: "Yayat Supriatna",
    position: "Kepala Dusun 3",
    period: "2024 - 2030",
    phone: "0812-0000-0006",
    email: "pelayanan@desamargalaksana.id",
    initials: "YS",
    photo: "https://i.pravatar.cc/300?img=19",
  },
];

// =========================================================
// COMPONENT APARAT
// =========================================================
const Aparat = () => {
  return (
    <section className="page-section">
      {/* ===== HEADER HIJAU ELEGAN ===== */}
      <div style={styles.aparatHeader}>
        <h2 style={styles.aparatHeaderTitle}>
          <i
            className="fas fa-users"
            style={{ marginRight: "12px", color: "#d4af37" }}
          ></i>
          Aparat Pemerintahan Desa
        </h2>
        <p style={styles.aparatHeaderDesc}>
          Struktur perangkat desa dan profil pengurus yang melayani masyarakat
          Desa Margalaksana
        </p>
      </div>

      {/* =====================================================
          DATA APARAT
      ===================================================== */}
      <div style={styles.aparatGrid}>
        {aparatData.map((aparat, index) => (
          <div key={index} style={styles.aparatCard}>
            {/* FOTO / AVATAR */}
            <div style={styles.avatar}>
              {/* Fallback Inisial (jika foto gagal dimuat) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                  background: `#${warnaOtomatis[index % warnaOtomatis.length]}`,
                  zIndex: 0,
                }}
              >
                {aparat.initials}
              </div>

              {/* Foto Asli */}
              <img
                src={aparat.photo}
                alt={aparat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              {/* STATUS */}
              <div style={styles.statusBadge}>
                <span style={styles.dot}></span>
                Aktif
              </div>
            </div>

            {/* INFORMASI APARAT */}
            <div style={styles.info}>
              <div style={styles.name}>{aparat.name}</div>

              <div style={styles.position}>{aparat.position}</div>

              <div style={styles.divider}></div>

              <div style={styles.detail}>
                <div>
                  <i
                    className="fas fa-calendar-alt"
                    style={{ color: "#1a5e3a" }}
                  ></i>{" "}
                  <span style={styles.detailLabel}>Periode:</span>{" "}
                  {aparat.period}
                </div>

                <div>
                  <i
                    className="fas fa-phone"
                    style={{ color: "#1a5e3a" }}
                  ></i>{" "}
                  <span style={styles.detailLabel}>Telepon:</span>{" "}
                  {aparat.phone}
                </div>

                <div>
                  <i
                    className="fas fa-envelope"
                    style={{ color: "#1a5e3a" }}
                  ></i>{" "}
                  <span style={styles.detailLabel}>Email:</span>{" "}
                  {aparat.email}
                </div>
              </div>

              {/* KONTAK */}
              <div style={styles.contactBadge}>
                <i className="fab fa-whatsapp"></i> {aparat.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          STRUKTUR ORGANISASI
      ===================================================== */}
      <div style={styles.strukturBox}>
        <h3 style={styles.strukturTitle}>
          <i
            className="fas fa-sitemap"
            style={{ color: "#1a5e3a" }}
          ></i>
          Struktur Organisasi Pemerintahan Desa
        </h3>

        <div style={styles.orgChart}>
          {/* KEPALA DESA */}
          <div style={styles.orgRow}>
            <div style={{ ...styles.orgItem, ...styles.orgLeader }}>
              👨‍💼 Kepala Desa
              <br />
              <small>Ixsan Sugianto</small>
            </div>
          </div>

          <div style={styles.orgLine}></div>

          {/* SEKRETARIS */}
          <div style={styles.orgRow}>
            <div style={styles.orgItem}>
              📋 Sekretaris Desa
              <br />
              <small>Zaenal Mutakin</small>
            </div>
          </div>

          <div style={styles.orgLine}></div>

          {/* KEPALA URUSAN / SEKSI */}
          <div style={styles.orgRow}>
            <div style={styles.orgItem}>
              💰 Kaur Keuangan
              <br />
              <small>Cevi Badru Tamam N.S</small>
            </div>

            <div style={styles.orgItem}>
              📁 Kaur Umum & T.U
              <br />
              <small>Dede Maryati</small>
            </div>

            <div style={styles.orgItem}>
              📊 Kaur Perencanaan
              <br />
              <small>Adam Al Farisi P.</small>
            </div>

            <div style={styles.orgItem}>
              🏛️ Kasi Pemerintahan
              <br />
              <small>Nuraliman</small>
            </div>

            <div style={styles.orgItem}>
              🤝 Kasi Kesejahteraan
              <br />
              <small>Ai Astuti</small>
            </div>

            <div style={styles.orgItem}>
              🛎️ Kasi Pelayanan
              <br />
              <small>Heryandi</small>
            </div>
          </div>

          <div style={styles.orgLine}></div>

          {/* WILAYAH */}
          <div style={{ ...styles.orgRow, gap: "12px", flexWrap: "wrap" }}>
            <span style={styles.badgeGreen}>🏘️ 3 Kadus</span>
            <span style={styles.badgeGold}>🏡 25 RT</span>
            <span style={styles.badgeGreen}>🌾 10 Kelompok Tani</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// =========================================================
// STYLE
// =========================================================
const styles = {
  /* ===== HEADER HIJAU ===== */
  aparatHeader: {
    background: "linear-gradient(135deg, #0f3d24 0%, #1a5e3a 100%)",
    borderRadius: "var(--radius)",
    padding: "50px 40px",
    marginBottom: "40px",
    borderLeft: "6px solid #d4af37",
    boxShadow: "0 8px 30px rgba(15, 61, 36, 0.25)",
    position: "relative",
    overflow: "hidden",
  },
  aparatHeaderTitle: {
    fontSize: "2rem",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  aparatHeaderDesc: {
    fontSize: "1.1rem",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 1.6,
    maxWidth: "750px",
  },

  /* ===== GRID APARAT ===== */
  aparatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "28px",
  },

  /* ===== CARD APARAT ===== */
  aparatCard: {
    background: "white",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
    border: "1px solid rgba(26, 94, 58, 0.1)",
    transition: "0.3s ease",
    textAlign: "center",
  },

  avatar: {
    width: "100%",
    height: "280px", // Sedikit lebih tinggi agar foto wajah proporsional
    background: "linear-gradient(145deg, #e8f3ed, #c9e3d5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  statusBadge: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    background: "rgba(15, 61, 36, 0.85)",
    backdropFilter: "blur(4px)",
    padding: "4px 14px",
    borderRadius: "40px",
    fontSize: "0.65rem",
    fontWeight: 600,
    color: "#4ec88a",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid rgba(78, 200, 138, 0.4)",
    zIndex: 2, // Pastikan badge di atas foto
  },

  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ec88a",
    animation: "pulse-dot 1.5s infinite",
  },

  /* ===== INFO ===== */
  info: {
    padding: "20px 24px 24px",
  },

  name: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#0f3d24",
    marginBottom: "4px",
    lineHeight: 1.3,
  },

  position: {
    fontSize: "0.9rem",
    color: "#1a5e3a",
    fontWeight: 600,
    marginBottom: "6px",
  },

  divider: {
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg, #d4af37, #f4d77c)",
    borderRadius: "4px",
    margin: "8px auto 12px",
  },

  detail: {
    fontSize: "0.85rem",
    color: "#546e7a",
    lineHeight: 1.8,
    textAlign: "left",
  },

  detailLabel: {
    fontWeight: 500,
    color: "#37474f",
  },

  contactBadge: {
    display: "inline-block",
    marginTop: "12px",
    padding: "6px 18px",
    background: "linear-gradient(135deg, #e8f3ed, #d4e8dc)",
    borderRadius: "40px",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#0f3d24",
    border: "1px solid rgba(26, 94, 58, 0.15)",
  },

  /* ===== STRUKTUR ===== */
  strukturBox: {
    background: "white",
    borderRadius: "var(--radius)",
    padding: "32px 36px",
    boxShadow: "var(--shadow)",
    border: "1px solid rgba(26, 94, 58, 0.1)",
    marginTop: "40px",
  },

  strukturTitle: {
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#0f3d24",
  },

  orgChart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  orgRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
  },

  orgItem: {
    background: "linear-gradient(135deg, #e8f3ed, #d4e8dc)",
    padding: "10px 24px",
    borderRadius: "40px",
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "#0f3d24",
    border: "1px solid rgba(26, 94, 58, 0.15)",
    textAlign: "center",
    lineHeight: 1.4,
  },

  orgLeader: {
    background: "linear-gradient(135deg, #d4af37, #f4d77c)",
    borderColor: "#d4af37",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#0f3d24",
    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
  },

  orgLine: {
    width: "2px",
    height: "20px",
    background: "linear-gradient(to bottom, #d4af37, #1a5e3a)",
  },

  /* ===== BADGE ===== */
  badgeGreen: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    background: "linear-gradient(135deg, #1a5e3a, #2d8a5a)",
    color: "#ffffff",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: 600,
    boxShadow: "0 3px 10px rgba(26, 94, 58, 0.3)",
  },
  badgeGold: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    background: "linear-gradient(135deg, #d4af37, #f4d77c)",
    color: "#0f3d24",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: 600,
    boxShadow: "0 3px 10px rgba(212, 175, 55, 0.3)",
  },
};

export default Aparat;