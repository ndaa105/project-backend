const mongoose = require("mongoose");

// Schema soal ujian English Speaking
const UjianSPSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Schema jawaban ujian English Speaking
const JawabanUjianSPSchema = new mongoose.Schema({
  id_soal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UjianSP",
  },
  nama_siswa: String,
  jawaban_teks: String,
  file_jawaban: String,
});

const UjianSP = mongoose.model("UjianSP", UjianSPSchema);
const JawabanUjianSP = mongoose.model("JawabanUjianSP", JawabanUjianSPSchema);

module.exports = { UjianSP, JawabanUjianSP };
