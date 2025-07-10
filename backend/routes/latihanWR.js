const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/laporan" });

const { LatihanWR, JawabanLatihanWR } = require("../models/latihan_wr");

// Soal Latihan
router.get("/", async (req, res) => {
  const soal = await LatihanWR.find();
  res.json(soal);
});

router.post("/", async (req, res) => {
  const newSoal = new LatihanWR(req.body);
  await newSoal.save();
  res.json(newSoal);
});

// Jawaban Latihan
router.get("/jawaban/:id", async (req, res) => {
  const jawaban = await JawabanLatihanWR.find({ id_soal: req.params.id });
  res.json(jawaban);
});

router.post("/jawaban", upload.single("file"), async (req, res) => {
  try {
    const newJawaban = new JawabanLatihanWR({
      id_soal: req.body.id_soal,
      nama_siswa: req.body.nama_siswa,
      jawaban: req.body.jawaban,
      file: req.file ? req.file.filename : "",
    });

    await newJawaban.save();
    res.json(newJawaban);
  } catch (err) {
    console.error("Gagal simpan jawaban:", err);
    res.status(500).json({ message: "Gagal simpan jawaban" });
  }
});

// Hapus soal
router.delete("/:id", async (req, res) => {
  try {
    await LatihanWR.findByIdAndDelete(req.params.id);
    await JawabanLatihanWR.deleteMany({ id_soal: req.params.id });
    res.json({ message: "Soal berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus soal." });
  }
});

// Keep jawaban
router.get("/jawaban_siswa/:nama", async (req, res) => {
  const data = await JawabanLatihanWR.find({ nama_siswa: req.params.nama });
  res.json(data);
});

// Hapus jawaban
router.delete("/jawaban/:id", async (req, res) => {
  try {
    await JawabanLatihanWR.findByIdAndDelete(req.params.id);
    res.json({ message: "Jawaban berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus jawaban." });
  }
});

module.exports = router;
