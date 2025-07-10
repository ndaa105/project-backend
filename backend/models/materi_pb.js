const mongoose = require("mongoose");

const materiPBSchema = new mongoose.Schema(
  {
    judul: String,
    deskripsi: String,
    tautan: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MateriPB", materiPBSchema);
