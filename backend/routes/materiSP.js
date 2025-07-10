const express = require("express");
const router = express.Router();
const MateriSP = require("../models/materi_sp"); // Ganti model ke Speaking
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/modul/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Tambah modul
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newModul = new MateriSP({
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
      tautan: req.body.tautan,
      fileUrl: req.file ? req.file.path : "",
    });

    await newModul.save();
    res.status(201).json(newModul);
  } catch (err) {
    res.status(500).json({ message: "Upload gagal", error: err.message });
  }
});

// Ambil semua modul
router.get("/", async (req, res) => {
  try {
    const modul = await MateriSP.find().sort({ createdAt: -1 });
    res.json(modul);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
});

// Hapus modul berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const modul = await MateriSP.findByIdAndDelete(req.params.id);
    if (!modul) {
      return res.status(404).json({ message: "Modul tidak ditemukan" });
    }

    // Hapus file fisik jika ada
    if (modul.fileUrl && fs.existsSync(modul.fileUrl)) {
      fs.unlinkSync(modul.fileUrl);
    }

    res.json({ message: "Modul berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus modul", error: err.message });
  }
});

module.exports = router;
