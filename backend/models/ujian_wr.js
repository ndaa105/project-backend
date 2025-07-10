const mongoose = require("mongoose");

// Schema soal ujian English Writing
const UjianWRSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Schema jawaban ujian English Writing
const JawabanUjianWRSchema = new mongoose.Schema({
  id_soal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UjianWR",
  },
  nama_siswa: String,
  jawaban_teks: String,
  file_jawaban: String,
});

const UjianWR = mongoose.model("UjianWR", UjianWRSchema);
const JawabanUjianWR = mongoose.model("JawabanUjianWR", JawabanUjianWRSchema);

module.exports = { UjianWR, JawabanUjianWR };
