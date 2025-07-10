const mongoose = require("mongoose");

const kelasSpSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  link: { type: String, required: true },
  tanggal: { type: String, required: true },
});

module.exports = mongoose.model("KelasSP", kelasSpSchema, "kelas_sp");
