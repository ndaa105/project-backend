const express = require("express");
const router = express.Router();
const KelasPB = require("../models/kelas_pb");

router.get("/", async (req, res) => {
  try {
    const jadwal = await KelasPB.find();
    res.json(jadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { judul, link, tanggal } = req.body;
    const newJadwal = new KelasPB({ judul, link, tanggal });
    await newJadwal.save();
    res.status(201).json(newJadwal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await KelasPB.findByIdAndDelete(req.params.id);
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
