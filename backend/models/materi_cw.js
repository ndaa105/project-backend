const mongoose = require('mongoose');

const MateriCwSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsi: String,
  tautan: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MateriCw', MateriCwSchema);
