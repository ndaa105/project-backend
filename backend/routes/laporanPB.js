const express = require("express");
const router = express.Router();
const multer = require("multer");
const LaporanPB = require("../models/laporan_pb");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/laporan/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const laporan = await LaporanPB.find().populate("id_siswa", "name").exec();
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ message: "Error ambil laporan" });
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.body.id_siswa || !req.body.jenis || !req.body.nilai) {
      return res.status(400).json({ message: "Field wajib belum diisi" });
    }
    const newLaporan = new LaporanPB({
      id_siswa: req.body.id_siswa,
      jenis: req.body.jenis,
      nilai: req.body.nilai,
      catatan: req.body.catatan,
      file: req.file ? req.file.filename : null,
    });
    await newLaporan.save();
    res.json(newLaporan);
  } catch (error) {
    res.status(500).json({ message: "Gagal upload nilai" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await LaporanPB.findByIdAndDelete(req.params.id);
    res.json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal hapus laporan" });
  }
});

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
    const updated = await LaporanPB.findByIdAndUpdate(
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
