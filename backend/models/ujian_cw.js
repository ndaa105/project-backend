const mongoose = require("mongoose");

// Schema soal ujian
const UjianCWSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
});

// Schema jawaban ujian
const JawabanUjianCWSchema = new mongoose.Schema({
  id_soal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UjianCW",
  },
  nama_siswa: String,
  jawaban_teks: String,
  file_jawaban: String,
});

const UjianCW = mongoose.model("UjianCW", UjianCWSchema);
const JawabanUjianCW = mongoose.model("JawabanUjianCW", JawabanUjianCWSchema);

module.exports = { UjianCW, JawabanUjianCW };
