const mongoose = require("mongoose");

const kelasPBSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  link: { type: String, required: true },
  tanggal: { type: String, required: true },
});

module.exports = mongoose.model("KelasPB", kelasPBSchema, "kelas_pb");
