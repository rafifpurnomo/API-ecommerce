const modelpenjual = require("../models/penjual");

const getAllpenjual = async (req, res) => {
  try {
    const [datapenjual] = await modelpenjual.getAllPenjual();
    if (datapenjual.length > 0) {
      res.json({
        message: "menampilkan semua akun penjual",
        data: datapenjual,
      });
    } else {
      res.status(404).json({
        message: "tidak ada data akun penjual",
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
  getAllpenjual,
};
