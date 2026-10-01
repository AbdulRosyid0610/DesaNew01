import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Warna Tema Hijau
  const themeGreen = "#10b981";
  const themeGreenHover = "#059669";
  const themeGreenLight = "#ecfdf5";

  // ==========================================
  // PROSES LOGIN
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validasi input
    if (!username || !password) {
      setError("Username dan password harus diisi!");
      return;
    }

    // ==========================================
    // AKUN ADMIN
    // ==========================================
    const validUsername = "admin123";
    const validPassword = "admin123";

    // ==========================================
    // CEK LOGIN
    // ==========================================
    if (username === validUsername && password === validPassword) {
      console.log("Login berhasil:", {
        username,
        rememberMe,
      });

      // ========================================
      // SIMPAN STATUS LOGIN
      // ========================================
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
      } else {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
      }

      // ========================================
      // REDIRECT KE ADMIN DASHBOARD
      // ========================================
      navigate("/admin");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* ======================================
            HEADER
        ====================================== */}
        <div className="login-header">
          <div 
            className="icon-shield" 
            style={{ backgroundColor: themeGreen, color: "white" }}
          >
            <i className="fas fa-user-shield"></i>
          </div>

          <h1>Selamat Datang</h1>
          <p>Masuk ke panel admin</p>
        </div>

        {/* ======================================
            FORM LOGIN
        ====================================== */}
        <form className="login-form" onSubmit={handleSubmit}>

          {/* ERROR */}
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {/* USERNAME */}
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="Username atau Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <i className="fas fa-envelope"></i>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <i className="fas fa-lock"></i>

            {/* SHOW / HIDE PASSWORD */}
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <i
                className={
                  showPassword
                    ? "fas fa-eye-slash"
                    : "far fa-eye"
                }
              ></i>
            </button>
          </div>

          {/* ======================================
              OPTIONS
          ====================================== */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />
              Ingat saya
            </label>

            {/* Link Lupa Sandi - Ubah jadi Hijau */}
            <a
              href="#"
              className="forgot-link"
              style={{ color: themeGreen }}
              onClick={(e) => e.preventDefault()}
              onMouseOver={(e) => e.target.style.color = themeGreenHover}
              onMouseOut={(e) => e.target.style.color = themeGreen}
            >
              Lupa sandi?
            </a>
          </div>

          {/* ======================================
              BUTTON LOGIN - Ubah jadi Hijau
          ====================================== */}
          <button 
            type="submit" 
            className="btn-login"
            style={{ backgroundColor: themeGreen }}
            onMouseOver={(e) => e.target.style.backgroundColor = themeGreenHover}
            onMouseOut={(e) => e.target.style.backgroundColor = themeGreen}
          >
            <span>Masuk</span>
            <i className="fas fa-arrow-right"></i>
          </button>

        </form>

        {/* ======================================
            TOMBOL KEMBALI KE BERANDA
        ====================================== */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link 
            to="/" 
            style={{ 
              color: themeGreen, // Ubah jadi Hijau
              textDecoration: "none", 
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = themeGreenHover}
            onMouseOut={(e) => e.target.style.color = themeGreen}
          >
            <i className="fas fa-arrow-left"></i>
            Kembali ke Beranda
          </Link>
        </div>

        {/* ======================================
            DEMO ACCOUNT - Ubah jadi Hijau
        ====================================== */}
        <div 
          className="demo-info" 
          style={{ 
            border: `1px solid ${themeGreen}`, 
            color: themeGreen,
            backgroundColor: themeGreenLight // Background hijau sangat muda
          }}
        >
          <p>
            <i className="fas fa-info-circle"></i>
            Akun Demo:{" "}
            <strong style={{ color: themeGreenHover }}>admin123</strong> /{" "}
            <strong style={{ color: themeGreenHover }}>admin123</strong>
          </p>

          <p
            style={{
              fontSize: "0.75rem",
              marginTop: "4px",
              opacity: 0.7,
            }}
          >
            (Username dan password sama: admin123)
          </p>
        </div>

        {/* ======================================
            FOOTER
        ====================================== */}
        <div className="login-footer">
          <span>© 2026 · Admin Dashboard</span>
        </div>

      </div>
    </div>
  );
};

export default Login;