const mongoose = require("mongoose");

const kelasCwSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  link: { type: String, required: true },
  tanggal: { type: String, required: true },
});

module.exports = mongoose.model("KelasCW", kelasCwSchema, "kelas_cw");
