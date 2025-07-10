const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/laporan" });
const { LatihanPB, JawabanLatihanPB } = require("../models/latihan_pb");

router.get("/", async (req, res) => {
  const soal = await LatihanPB.find();
  res.json(soal);
});

router.post("/", async (req, res) => {
  const newSoal = new LatihanPB(req.body);
  await newSoal.save();
  res.json(newSoal);
});

router.get("/jawaban/:id", async (req, res) => {
  const jawaban = await JawabanLatihanPB.find({ id_soal: req.params.id });
  res.json(jawaban);
});

router.post("/jawaban", upload.single("file"), async (req, res) => {
  try {
    const newJawaban = new JawabanLatihanPB({
      id_soal: req.body.id_soal,
      nama_siswa: req.body.nama_siswa,
      jawaban: req.body.jawaban,
      file: req.file ? req.file.filename : "",
    });
    await newJawaban.save();
    res.json(newJawaban);
  } catch (err) {
    res.status(500).json({ message: "Gagal simpan jawaban" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await LatihanPB.findByIdAndDelete(req.params.id);
    await JawabanLatihanPB.deleteMany({ id_soal: req.params.id });
    res.json({ message: "Soal berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus soal." });
  }
});

router.get("/jawaban_siswa/:nama", async (req, res) => {
  const data = await JawabanLatihanPB.find({ nama_siswa: req.params.nama });
  res.json(data);
});

router.delete("/jawaban/:id", async (req, res) => {
  try {
    await JawabanLatihanPB.findByIdAndDelete(req.params.id);
    res.json({ message: "Jawaban berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus jawaban." });
  }
});

module.exports = router;
