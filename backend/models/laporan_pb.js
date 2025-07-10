const mongoose = require("mongoose");

const laporanPBSchema = new mongoose.Schema({
  id_siswa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "siswa",
    required: true,
  },
  jenis: {
    type: String,
    enum: ["latihan", "ujian"],
    required: true,
  },
  nilai: {
    type: String,
    required: true,
  },
  catatan: String,
  file: String,
});

module.exports = mongoose.model("LaporanPB", laporanPBSchema);
