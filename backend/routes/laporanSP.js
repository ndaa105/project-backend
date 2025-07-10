const express = require("express");
const router = express.Router();
const multer = require("multer");
const LaporanSP = require("../models/laporan_sp");

// Setup folder penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/laporan/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Ambil semua laporan
router.get("/", async (req, res) => {
  try {
    const laporan = await LaporanSP.find().populate("id_siswa", "name").exec();

    console.log("=== HASIL LAPORAN SP YANG DIPOPULATE ===");
    console.log(JSON.stringify(laporan, null, 2));

    res.json(laporan);
  } catch (error) {
    console.error("ERROR GET LAPORAN:", error);
    res.status(500).json({ message: "Error ambil laporan" });
  }
});

// Upload laporan nilai siswa
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.body.id_siswa || !req.body.jenis || !req.body.nilai) {
      return res.status(400).json({ message: "Field wajib belum diisi" });
    }

    const newLaporan = new LaporanSP({
      id_siswa: req.body.id_siswa,
      jenis: req.body.jenis,
      nilai: req.body.nilai,
      catatan: req.body.catatan,
      file: req.file ? req.file.filename : null,
    });

    await newLaporan.save();
    res.json(newLaporan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal upload nilai" });
  }
});

// Hapus laporan
router.delete("/:id", async (req, res) => {
  try {
    await LaporanSP.findByIdAndDelete(req.params.id);
    res.json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal hapus laporan" });
  }
});

// Update laporan
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const updateData = {
      id_siswa: req.body.id_siswa,
      jenis: req.body.jenis,
      nilai: req.body.nilai,
      catatan: req.body.catatan,
    };
    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updated = await LaporanSP.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal update nilai" });
  }
});

module.exports = router;
