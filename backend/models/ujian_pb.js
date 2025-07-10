const mongoose = require("mongoose");

// Soal Ujian Public Speaking
const UjianPBSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Jawaban Ujian Public Speaking
const JawabanUjianPBSchema = new mongoose.Schema({
  id_soal: { type: mongoose.Schema.Types.ObjectId, ref: "UjianPB" },
  nama_siswa: String,
  jawaban_teks: String,
  file_jawaban: String,
});

const UjianPB = mongoose.model("UjianPB", UjianPBSchema);
const JawabanUjianPB = mongoose.model("JawabanUjianPB", JawabanUjianPBSchema);

module.exports = { UjianPB, JawabanUjianPB };
