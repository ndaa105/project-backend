const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// Log awal startup
console.log("🚀 Memulai server...");
console.log("🔧 PORT:", port);
console.log("🧬 MONGODB_URI:", process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Terhubung ke MongoDB"))
  .catch((err) => console.error("Gagal koneksi MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Backend aktif 🚀");
});

// Siswa routes
const siswaRoutes = require("./routes/siswa");
app.use("/api/siswa", siswaRoutes);

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Halo dari backend Node.js!" });
});

//Tutor route
const tutorRoutes = require("./routes/tutor");
app.use("/api/tutor", tutorRoutes);

// Materi Copywriting dari Tutor
const materiCwRoutes = require("./routes/materiCw");
app.use("/api/materi_cw", materiCwRoutes);
app.use("/uploads", express.static("uploads"));

// Meet Cw routes
const kelasCwRoutes = require("./routes/kelasCw");
app.use("/api/kelas_cw", kelasCwRoutes);

//Latihan Cw routes
const latihanCwRoutes = require("./routes/latihanCw");
app.use("/api/latihan_cw", latihanCwRoutes);

//Ujian Cw routes
const ujianCwRoutes = require("./routes/ujianCw");
app.use("/api/ujian_cw", ujianCwRoutes);

// Laporan Cw routes
const laporanCwRoutes = require("./routes/laporanCw");
app.use("/api/laporan_cw", laporanCwRoutes);
app.use("/uploads/laporan", express.static("uploads/laporan"));

// server.js atau routes/materi.js
app.get("/matericws", async (req, res) => {
  const materi = await db.collection("matericws").find().toArray();
  res.json(materi);
});

// Englishwriting routes
const materiWRRoutes = require("./routes/materiWR");
app.use("/api/materi_wr", materiWRRoutes);

const kelasWRRoutes = require("./routes/kelasWR");
app.use("/api/kelas_wr", kelasWRRoutes);

const latihanWRRoutes = require("./routes/latihanWR");
app.use("/api/latihan_wr", latihanWRRoutes);

const ujianWRRoutes = require("./routes/ujianWR");
app.use("/api/ujian_wr", ujianWRRoutes);

const laporanWRRoutes = require("./routes/laporanWR");
app.use("/api/laporan_wr", laporanWRRoutes);

// EnglishSpeaking routes
const materiSPRoutes = require("./routes/materiSP");
app.use("/api/materi_sp", materiSPRoutes);

const kelasSPRoutes = require("./routes/kelasSP");
app.use("/api/kelas_sp", kelasSPRoutes);

const latihanSPRoutes = require("./routes/latihanSP");
app.use("/api/latihan_sp", latihanSPRoutes);

const ujianSPRoutes = require("./routes/ujianSP");
app.use("/api/ujian_sp", ujianSPRoutes);

const laporanSPRoutes = require("./routes/laporanSP");
app.use("/api/laporan_sp", laporanSPRoutes);

// Publicspeaking routes
const materiPBRoutes = require("./routes/materiPB");
app.use("/api/materi_pb", materiPBRoutes);

const kelasPBRoutes = require("./routes/kelasPB");
app.use("/api/kelas_pb", kelasPBRoutes);

const latihanPBRoutes = require("./routes/latihanPB");
app.use("/api/latihan_pb", latihanPBRoutes);

const ujianPBRoutes = require("./routes/ujianPB");
app.use("/api/ujian_pb", ujianPBRoutes);

const laporanPBRoutes = require("./routes/laporanPB");
app.use("/api/laporan_pb", laporanPBRoutes);

// serve React frontend
const fs = require("fs");
const buildPath = path.join(__dirname, "../../frontend/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });

  console.log("✅ React frontend di-serve dari:", buildPath);
} else {
  console.warn(
    "⚠️ Folder build frontend tidak ditemukan. React frontend tidak di-serve."
  );
}

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});
