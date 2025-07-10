const express = require("express");
const router = express.Router();
const KelasSP = require("../models/kelas_sp"); // Ganti model ke kelas_sp

// GET semua jadwal
router.get("/", async (req, res) => {
  try {
    const jadwal = await KelasSP.find();
    res.json(jadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah jadwal
router.post("/", async (req, res) => {
  try {
    const { judul, link, tanggal } = req.body;
    const newJadwal = new KelasSP({ judul, link, tanggal });
    await newJadwal.save();
    res.status(201).json(newJadwal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE jadwal
router.delete("/:id", async (req, res) => {
  try {
    await KelasSP.findByIdAndDelete(req.params.id);
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
