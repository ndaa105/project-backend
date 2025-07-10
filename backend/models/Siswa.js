const mongoose = require('mongoose');

const siswaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// koneksi
module.exports = mongoose.model('siswa', siswaSchema, 'siswa');