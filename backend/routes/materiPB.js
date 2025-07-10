const express = require("express");
const router = express.Router();
const MateriPB = require("../models/materi_pb");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newModul = new MateriPB({
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

router.get("/", async (req, res) => {
  try {
    const modul = await MateriPB.find().sort({ createdAt: -1 });
    res.json(modul);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const modul = await MateriPB.findByIdAndDelete(req.params.id);
    if (!modul) {
      return res.status(404).json({ message: "Modul tidak ditemukan" });
    }
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
