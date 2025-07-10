const express = require("express");
const router = express.Router();
const Siswa = require("../models/Siswa");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register attempt:", req.body);

    // Validasi
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Cek jika siswa sudah ada
    const existingSiswa = await Siswa.findOne({ email });
    if (existingSiswa) {
      console.warn("Pendaftaran ditolak: email sudah terdaftar");
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Buat siswa baru
    const newSiswa = new Siswa({ name, email, password });

    await newSiswa
      .save()
      .then(() => {
        console.log("Siswa baru disimpan ke database:", newSiswa);
        res
          .status(201)
          .json({ message: "Registrasi berhasil", siswa: newSiswa });
      })
      .catch((saveErr) => {
        console.error("Gagal menyimpan siswa:", saveErr);
        res
          .status(500)
          .json({ message: "Gagal menyimpan ke database", error: saveErr });
      });
  } catch (error) {
    console.error("Error pada endpoint /register:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", req.body);

    const siswa = await Siswa.findOne({ email });

    if (!siswa) {
      console.warn("Login gagal: email tidak ditemukan");
      return res.status(400).json({ message: "Email tidak terdaftar" });
    }

    if (siswa.password !== password) {
      console.warn("Login gagal: password salah");
      return res.status(400).json({ message: "Password salah" });
    }

    console.log("Login berhasil untuk:", siswa.name);
    res.json({ message: "Login berhasil", siswa });
  } catch (error) {
    console.error("Error pada endpoint /login:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get siswa
router.get("/", async (req, res) => {
  try {
    const data = await Siswa.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data siswa." });
  }
});

// Update data siswa
router.put("/:id", async (req, res) => {
  try {
    const updated = await Siswa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Gagal update siswa" });
  }
});

// Hapus siswa
router.delete("/:id", async (req, res) => {
  try {
    await Siswa.findByIdAndDelete(req.params.id);
    res.json({ message: "Siswa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus siswa" });
  }
});

module.exports = router;
