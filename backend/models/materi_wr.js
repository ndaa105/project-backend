const mongoose = require("mongoose");

const materiWRSpec = new mongoose.Schema(
  {
    judul: String,
    deskripsi: String,
    tautan: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MateriWR", materiWRSpec);
