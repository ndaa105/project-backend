const mongoose = require("mongoose");

// Soal Latihan English Speaking
const latihanSpSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Jawaban Latihan English Speaking
const jawabanLatihanSpSchema = new mongoose.Schema({
  id_soal: { type: mongoose.Schema.Types.ObjectId, ref: "LatihanSP" },
  nama_siswa: String,
  jawaban: String,
  file: String,
});

module.exports = {
  LatihanSP: mongoose.model("LatihanSP", latihanSpSchema),
  JawabanLatihanSP: mongoose.model("JawabanLatihanSP", jawabanLatihanSpSchema),
};
