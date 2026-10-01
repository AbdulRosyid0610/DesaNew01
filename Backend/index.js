const express = require('express');
const cors = require('cors');
require('dotenv').config();

const wargaRoutes = require('./routes/wargaRoutes');
const umkmRoutes = require('./routes/umkmRoutes');
const pengaduanRoutes = require('./routes/pengaduanRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // <-- BARU

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/warga', wargaRoutes);
app.use('/api/umkm', umkmRoutes);
app.use('/api/pengaduan', pengaduanRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/dashboard', dashboardRoutes); // <-- BARU

app.listen(PORT, () => {
  console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});