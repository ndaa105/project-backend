const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/laporan" });
const { UjianPB, JawabanUjianPB } = require("../models/ujian_pb");

router.get("/", async (req, res) => {
  const soal = await UjianPB.find();
  res.json(soal);
});

router.post("/", async (req, res) => {
  const newSoal = new UjianPB(req.body);
  await newSoal.save();
  res.json(newSoal);
});

router.get("/jawaban/:id", async (req, res) => {
  const jawaban = await JawabanUjianPB.find({ id_soal: req.params.id });
  res.json(jawaban);
});

router.post("/jawaban", upload.single("file"), async (req, res) => {
  try {
    const newJawaban = new JawabanUjianPB({
      id_soal: req.body.id_soal,
      nama_siswa: req.body.nama_siswa,
      jawaban_teks: req.body.jawaban,
      file_jawaban: req.file ? req.file.filename : "",
    });
    await newJawaban.save();
    res.json(newJawaban);
  } catch (err) {
    res.status(500).json({ message: "Gagal simpan jawaban ujian" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UjianPB.findByIdAndDelete(req.params.id);
    await JawabanUjianPB.deleteMany({ id_soal: req.params.id });
    res.json({ message: "Soal ujian berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus soal ujian." });
  }
});

router.get("/jawaban_siswa/:nama", async (req, res) => {
  const data = await JawabanUjianPB.find({ nama_siswa: req.params.nama });
  res.json(data);
});

router.delete("/jawaban/:id", async (req, res) => {
  try {
    await JawabanUjianPB.findByIdAndDelete(req.params.id);
    res.json({ message: "Jawaban berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus jawaban." });
  }
});

module.exports = router;
