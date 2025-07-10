const mongoose = require("mongoose");

// Soal Latihan Copywriting
const latihanCwSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Jawaban Latihan Copywriting
const jawabanLatihanCwSchema = new mongoose.Schema({
  id_soal: { type: mongoose.Schema.Types.ObjectId, ref: "LatihanCW" },
  nama_siswa: String,
  jawaban: String,
  file: String,
});

module.exports = {
  LatihanCW: mongoose.model("LatihanCW", latihanCwSchema),
  JawabanLatihanCW: mongoose.model("JawabanLatihanCW", jawabanLatihanCwSchema),
};
