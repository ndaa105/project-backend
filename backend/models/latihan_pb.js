const mongoose = require("mongoose");

// Soal Latihan Public Speaking
const latihanPBSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Jawaban Latihan Public Speaking
const jawabanLatihanPBSchema = new mongoose.Schema({
  id_soal: { type: mongoose.Schema.Types.ObjectId, ref: "LatihanPB" },
  nama_siswa: String,
  jawaban: String,
  file: String,
});

module.exports = {
  LatihanPB: mongoose.model("LatihanPB", latihanPBSchema),
  JawabanLatihanPB: mongoose.model("JawabanLatihanPB", jawabanLatihanPBSchema),
};
