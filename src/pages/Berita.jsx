import React from 'react';
import { Link } from 'react-router-dom'; // 1. TAMBAHKAN IMPORT INI
import { beritaData } from '../Data/beritaData';

const Berita = () => {
  return (
    <>
      <style>{`

        /* ==================================================
           PAKSA AREA BERITA FULL SCREEN
        ================================================== */

        .page-section:has(.berita-page) {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
          width: 100% !important;
        }


        /* ==================================================
           HALAMAN BERITA
        ================================================== */

        .berita-page {
          width: 100vw !important;
          max-width: 100vw !important;

          min-height: 100vh;

          margin: 0 !important;
          padding: 0 0 80px;

          box-sizing: border-box;

          background: #f7faf9;

          overflow-x: hidden;
        }


        /* ==================================================
           HEADER
           SAMA POSISI DENGAN STATISTIK
        ================================================== */

        .berita-header {
          position: relative;

          width: 100vw !important;
          max-width: 100vw !important;

          min-height: 230px;

          margin-top: 54px !important;
          margin-bottom: 44px;

          margin-left: 0 !important;

          box-sizing: border-box;

          padding:
            58px
            48px
            52px;

          background:
            linear-gradient(
              135deg,
              #0f3d24 0%,
              #155b37 55%,
              #17633d 100%
            );

          border-left: 6px solid #d4af37;

          box-shadow:
            0 8px 25px
            rgba(15, 61, 36, 0.18);

          text-align: left;
        }


        /* ==================================================
           JUDUL HEADER
        ================================================== */

        .berita-title {
          margin: 0 0 16px;

          display: flex;

          align-items: center;

          gap: 15px;

          color: #ffffff;

          font-family:
            'Playfair Display',
            Georgia,
            serif;

          font-size: 34px;

          font-weight: 700;

          line-height: 1.2;

          letter-spacing: -0.3px;
        }


        .berita-title i {
          width: 32px;

          color: #d4af37;

          font-size: 29px;

          text-align: center;

          flex-shrink: 0;
        }


        /* ==================================================
           SUBTITLE
        ================================================== */

        .berita-subtitle {
          max-width: 850px;

          margin: 0;

          color: rgba(255, 255, 255, 0.93);

          font-size: 16px;

          line-height: 1.7;

          font-weight: 400;
        }


        /* ==================================================
           WRAPPER BERITA
        ================================================== */

        .berita-grid-wrapper {
          width: 100%;

          max-width: 1200px;

          margin: 0 auto;

          padding: 0 30px;

          box-sizing: border-box;
        }


        .berita-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 28px;

          align-items: stretch;
        }


        /* ==================================================
           CARD BERITA
        ================================================== */

        .berita-card {
          position: relative;

          width: 100%;

          min-width: 0;

          overflow: hidden;

          display: flex;

          flex-direction: column;

          background: #ffffff;

          border:
            1px solid
            rgba(26, 94, 58, 0.10);

          border-radius: 16px;

          box-shadow:
            0 8px 25px
            rgba(15, 61, 36, 0.08);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }


        .berita-card::before {
          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 3px;

          background:
            linear-gradient(
              90deg,
              #d4af37,
              #1a5e3a
            );

          transform: scaleX(0);

          transform-origin: left;

          transition:
            transform 0.4s ease;

          z-index: 5;
        }


        .berita-card:hover::before {
          transform: scaleX(1);
        }


        .berita-card:hover {
          transform: translateY(-6px);

          box-shadow:
            0 16px 35px
            rgba(15, 61, 36, 0.15);
        }


        /* ==================================================
           FOTO
        ================================================== */

        .berita-image-wrapper {
          position: relative;

          width: 100%;

          height: 225px;

          overflow: hidden;

          background: #e8f3ed;
        }


        .berita-image {
          display: block;

          width: 100%;

          height: 100%;

          object-fit: cover;

          transition:
            transform 0.4s ease;
        }


        .berita-card:hover .berita-image {
          transform: scale(1.05);
        }


        /* ==================================================
           KATEGORI
        ================================================== */

        .berita-kategori {
          position: absolute;

          top: 16px;
          left: 16px;

          padding: 9px 15px;

          border-radius: 30px;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 0.4px;

          box-shadow:
            0 4px 10px
            rgba(0, 0, 0, 0.15);
        }


        /* ==================================================
           CONTENT
        ================================================== */

        .berita-content {
          display: flex;

          flex-direction: column;

          flex: 1;

          padding: 22px;
        }


        /* ==================================================
           TANGGAL
        ================================================== */

        .berita-tanggal {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 12px;

          color: #6b7280;

          font-size: 13px;

          font-weight: 500;
        }


        .berita-tanggal i {
          color: #0f6a43;
        }


        /* ==================================================
           JUDUL BERITA
        ================================================== */

        .berita-judul {
          margin: 0 0 13px;

          color: #0f3d24;

          font-family:
            'Playfair Display',
            Georgia,
            serif;

          font-size: 19px;

          font-weight: 700;

          line-height: 1.45;
        }


        /* ==================================================
           DESKRIPSI
        ================================================== */

        .berita-deskripsi {
          flex: 1;

          margin: 0 0 22px;

          color: #455a64;

          font-size: 14.5px;

          line-height: 1.7;
        }


        /* ==================================================
           BACA SELENGKAPNYA
        ================================================== */

        .berita-link {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          width: fit-content;

          padding-bottom: 3px;

          color: #0f6a43;

          font-size: 14px;

          font-weight: 700;

          text-decoration: none;

          border-bottom:
            2px solid transparent;

          transition:
            color 0.25s ease,
            border-color 0.25s ease;
        }


        .berita-link span {
          color: #d4af37;

          transition:
            transform 0.25s ease;
        }


        .berita-link:hover {
          color: #d4af37;

          border-bottom-color: #d4af37;
        }


        .berita-link:hover span {
          transform: translateX(5px);
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1000px) {

          .berita-header {
            padding: 48px 35px;
          }

          .berita-title {
            font-size: 30px;
          }

          .berita-grid-wrapper {
            padding: 0 25px;
          }

          .berita-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }


        /* ==================================================
           HP
        ================================================== */

        @media (max-width: 600px) {

          .berita-header {
            min-height: auto;

            margin-top: 30px !important;

            margin-bottom: 30px;

            padding:
              36px
              22px
              38px;

            border-left-width: 5px;
          }

          .berita-title {
            font-size: 23px;

            gap: 10px;
          }

          .berita-title i {
            width: 24px;

            font-size: 20px;
          }

          .berita-subtitle {
            font-size: 14px;

            line-height: 1.6;
          }

          .berita-grid-wrapper {
            padding: 0 16px;
          }

          .berita-grid {
            grid-template-columns: 1fr;

            gap: 22px;
          }

          .berita-image-wrapper {
            height: 205px;
          }

          .berita-judul {
            font-size: 18px;
          }
        }

      `}</style>


      <section className="berita-page">

        {/* =========================================
            HEADER
            POSISI DIBUAT SEPERTI STATISTIK
        ========================================= */}

        <div className="berita-header">

          <h2 className="berita-title">

            <i className="fas fa-newspaper"></i>

            Warta &amp; Kabar Terkini

          </h2>


          <p className="berita-subtitle">
            Informasi resmi seputar program, pembangunan,
            dan aktivitas warga Desa Margalaksana secara transparan.
          </p>

        </div>


        {/* =========================================
            ISI BERITA
        ========================================= */}

        <div className="berita-grid-wrapper">

          <div className="berita-grid">

            {beritaData.map((berita, index) => (

              <article
                className="berita-card"
                key={index}
              >

                {/* FOTO */}

                <div className="berita-image-wrapper">

                  <img
                    src={berita.gambar}
                    alt={berita.judul}
                    className="berita-image"
                  />


                  <span
                    className="berita-kategori"
                    style={{
                      backgroundColor:
                        berita.color,

                      color:
                        berita.textColor,
                    }}
                  >
                    {berita.kategori}
                  </span>

                </div>


                {/* ISI */}

                <div className="berita-content">

                  <div className="berita-tanggal">

                    <i className="fas fa-calendar-alt"></i>

                    {berita.tanggal}

                  </div>


                  <h3 className="berita-judul">
                    {berita.judul}
                  </h3>


                  <p className="berita-deskripsi">
                    {berita.deskripsi}
                  </p>


                  {/* =========================================
                      TOMBOL BACA SELENGKAPNYA
                      SEKARANG SUDAH BISA DIKLIK
                  ========================================= */}

                  <Link
                    to={`/berita/${index}`}
                    className="berita-link"
                  >
                    Baca Selengkapnya

                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>
    </>
  );
};

export default Berita;