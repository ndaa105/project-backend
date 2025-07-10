const mongoose = require("mongoose");

// Soal Latihan English Writing
const latihanWrSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Jawaban Latihan English Writing
const jawabanLatihanWrSchema = new mongoose.Schema({
  id_soal: { type: mongoose.Schema.Types.ObjectId, ref: "LatihanWR" },
  nama_siswa: String,
  jawaban: String,
  file: String,
});

module.exports = {
  LatihanWR: mongoose.model("LatihanWR", latihanWrSchema),
  JawabanLatihanWR: mongoose.model("JawabanLatihanWR", jawabanLatihanWrSchema),
};
