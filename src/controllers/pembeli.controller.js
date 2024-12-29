const modelPembeli = require("../models/pembeli");

const getAllPembeli = async (req, res) => {
  try {
    const [dataPembeli] = await modelPembeli.getAllPembeli();
    if (dataPembeli.length > 0) {
      res.json({
        message: "menampilkan semua akun pembeli",
        data: dataPembeli,
      });
    } else {
      res.status(404).json({
        message: "tidak ada data akun pembeli",
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
  getAllPembeli,
};
