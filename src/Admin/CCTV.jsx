import { FaVideo, FaCircle, FaExpand } from "react-icons/fa";
import "./AdminDashboard.css";

const cameras = [
  { id: 1, name: "CCTV Gerbang Desa", location: "Jalan Utama", online: true },
  { id: 2, name: "CCTV Balai Desa", location: "Balai Desa", online: true },
  { id: 3, name: "CCTV Pasar Desa", location: "Area Pasar", online: false },
  { id: 4, name: "CCTV Persimpangan", location: "RW 03", online: true },
];

function CCTV() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Monitoring CCTV</h2>
          <p>Pantau kamera keamanan di wilayah Desa Margalaksana.</p>
        </div>
        <span className="camera-total"><FaVideo /> {cameras.length} Kamera</span>
      </div>

      <div className="cctv-grid">
        {cameras.map((camera) => (
          <div className="cctv-card" key={camera.id}>
            <div className={`cctv-screen ${!camera.online ? "offline" : ""}`}>
              <FaVideo />
              {!camera.online && <span>OFFLINE</span>}
              {camera.online && <div className="live-label"><FaCircle /> LIVE</div>}
              <button className="expand-button" onClick={() => alert(`Membuka ${camera.name}`)}>
                <FaExpand />
              </button>
            </div>
            <div className="cctv-info">
              <div>
                <h3>{camera.name}</h3>
                <p>{camera.location}</p>
              </div>
              <span className={camera.online ? "online-status" : "offline-status"}>
                <FaCircle /> {camera.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CCTV;
