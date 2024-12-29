require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [dataPembeli] = await modelPembeli.getPembeliByEmail(email);
    if (dataPembeli.length > 0) {
      const pembeli = dataPembeli[0];
      const match = await bcrypt.compare(password, pembeli.password);
      if (match) {
        const token = jwt.sign(
          {
            id: pembeli.id,
            role: pembeli.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.json({
          massage: "Login succesful",
          token,
        });
      } else {
        return res.status(400).json({
          massage: "Email atau password salah",
          token,
        });
      }
    }

    const [dataPenjual] = await modelPenjual.getPenjualByEmail(email);
    if (dataPenjual.length > 0) {
      const penjual = dataPenjual[0];
      const match = bcrypt.compare(password, penjual.password);
      if (match) {
        const token = jwt.sign(
          {
            id: penjual.id,
            role: penjual.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.json({
          massage: "Login succesful",
          token,
        });
      } else {
        return res.status(400).json({
          massage: "Email atau password salah",
        });
      }
    }

    const [dataAdmin] = await modelPenjual.getPenjualByEmail(email);
    if (dataAdmin.length > 0) {
      const admin = dataAdmin[0];
      const match = bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          {
            id: admin.id,
            role: admin.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.json({
          massage: "Login succesful",
          token,
        });
      } else {
        return res.status(400).json({
          massage: "Email atau password salah",
        });
      }
    }

    return res.status(400).json({
      massage: "Email atau password salah"
    });
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const getModel = (role) => {
  switch (role) {
    case "pembeli":
      return modelPembeli;
    case "penjual":
      return modelPenjual;
    case "admin":
      return modelAdmin;
    default:
      throw new Error("Invalid Role");
  }
};

const me = async (req, res) => {
  const id = req.id;
  const role = req.role;

  try {
    console.log(role);
    const model = getModel(role);
    const [response] = await model.getUserByID(id);

    if (response.length > 0) {
      return res.json({ message: "user found", data: response });
    }
    return res.status(404).json({ message: "User not found" });
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
  login,
  me,
};
