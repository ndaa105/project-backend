const mongoose = require("mongoose");

const kelasWrSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  link: { type: String, required: true },
  tanggal: { type: String, required: true },
});

module.exports = mongoose.model("KelasWR", kelasWrSchema, "kelas_wr");
