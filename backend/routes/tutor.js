const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Tutor = require("../models/Tutor");

// LOGIN TUTOR
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password wajib diisi" });
  }

  try {
    const tutor = await Tutor.findOne({ username });
    if (!tutor) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, tutor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.status(200).json({ message: "Login berhasil", tutor });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// REGISTER TUTOR BARU
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Menerima request register tutor:", req.body);

  // Validasi input manual
  if (!username || username.trim().length < 2) {
    return res.status(400).json({ message: "Username minimal 2 karakter" });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password minimal 6 karakter" });
  }

  try {
    const existingTutor = await Tutor.findOne({ username });
    if (existingTutor) {
      return res.status(409).json({ message: "Username sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTutor = new Tutor({ username, password: hashedPassword });
    await newTutor.save();

    res.status(201).json({ message: "Tutor berhasil ditambahkan" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Gagal menambahkan tutor" });
  }
});

module.exports = router;
