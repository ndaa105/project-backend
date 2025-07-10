const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/laporan" });

const { UjianWR, JawabanUjianWR } = require("../models/ujian_wr");

// Ambil semua soal ujian
router.get("/", async (req, res) => {
  const soal = await UjianWR.find();
  res.json(soal);
});

// Buat soal ujian baru
router.post("/", async (req, res) => {
  const newSoal = new UjianWR(req.body);
  await newSoal.save();
  res.json(newSoal);
});

// Ambil semua jawaban untuk 1 soal ujian
router.get("/jawaban/:id", async (req, res) => {
  const jawaban = await JawabanUjianWR.find({ id_soal: req.params.id });
  res.json(jawaban);
});

// POST jawaban ujian dengan file
router.post("/jawaban", upload.single("file"), async (req, res) => {
  try {
    const newJawaban = new JawabanUjianWR({
      id_soal: req.body.id_soal,
      nama_siswa: req.body.nama_siswa,
      jawaban_teks: req.body.jawaban,
      file_jawaban: req.file ? req.file.filename : "",
    });

    await newJawaban.save();
    res.json(newJawaban);
  } catch (err) {
    console.error("Gagal simpan jawaban ujian:", err);
    res.status(500).json({ message: "Gagal simpan jawaban ujian" });
  }
});

// Hapus soal ujian dan jawaban terkaitnya
router.delete("/:id", async (req, res) => {
  try {
    await UjianWR.findByIdAndDelete(req.params.id);
    await JawabanUjianWR.deleteMany({ id_soal: req.params.id });
    res.json({ message: "Soal ujian berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus soal ujian." });
  }
});

// Get semua jawaban dari satu siswa
router.get("/jawaban_siswa/:nama", async (req, res) => {
  const data = await JawabanUjianWR.find({ nama_siswa: req.params.nama });
  res.json(data);
});

// Hapus jawaban
router.delete("/jawaban/:id", async (req, res) => {
  try {
    await JawabanUjianWR.findByIdAndDelete(req.params.id);
    res.json({ message: "Jawaban berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus jawaban." });
  }
});

module.exports = router;
