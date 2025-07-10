const mongoose = require("mongoose");

const materiSPSchema = new mongoose.Schema(
  {
    judul: String,
    deskripsi: String,
    tautan: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MateriSP", materiSPSchema);
