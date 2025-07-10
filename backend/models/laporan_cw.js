const mongoose = require("mongoose");

const laporanCwSchema = new mongoose.Schema({
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
  catatan: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("LaporanCW", laporanCwSchema);
