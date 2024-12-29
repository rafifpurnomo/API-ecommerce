const modelAdmin = require("../models/admin");

const getAllAdmin = async (req, res) => {
  try {
    const [dataAdmin] = await modelAdmin.getAlladmin();
    if (dataAdmin.length > 0) {
      res.json({
        message: "menampilkan semua akun Admin",
        data: dataAdmin,
      });
    } else {
      res.status(404).json({
        message: "tidak ada data akun Admin",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const createAccountAdmin = async (req, res) => {
  const { first_name, last_name, email, password, no_telpon } = req.body;

  try {
    const [dataAkunAdmin] = await modelAdmin.getadminByEmail(email);

    if (dataAkunAdmin.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar. Silakan gunakan email lain.",
      });
    } else {
      await modelAdmin.addAdmin(
        first_name,
        last_name,
        email,
        password,
        no_telpon
      );
      return res.json({
        message: "Akun admin berhasil dibuat",
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
  getAllAdmin,
  createAccountAdmin,
};
