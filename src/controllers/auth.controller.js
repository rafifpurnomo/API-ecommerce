const modelPembeli = require("../models/pembeli");
const modelAdmin = require("../models/admin");
const modelPenjual = require("../models/penjual");

const createAccountPembeli = async (req, res) => {
  const { first_name, last_name, email, password, no_telpon } = req.body;

  try {
    const [dataAkunPembeli] = await modelPembeli.getPembeliByEmail(email);

    if (dataAkunPembeli.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar. Silakan gunakan email lain.",
      });
    } else {
      await modelPembeli.addPembeli(
        first_name,
        last_name,
        email,
        password,
        no_telpon
      );
      return res.json({
        message: "Akun pembeli berhasil dibuat",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const createAccountPenjual = async (req, res) => {
  const { nama_toko, alamat, email, password, no_telpon } = req.body;

  try {
    const [dataAkunPenjual] = await modelPenjual.getPenjualByEmail(email);

    if (dataAkunPenjual.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar. Silakan gunakan email lain.",
      });
    } else {
      await modelPenjual.addPenjual(
        nama_toko,
        alamat,
        email,
        password,
        no_telpon
      );
      return res.json({
        message: "Akun penjual berhasil dibuat",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createAccountPembeli,
  createAccountPenjual,
};
