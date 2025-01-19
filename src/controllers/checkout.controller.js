const modelCheckout = require("../models/checkout");
const produkController = require("../controllers/produk.controller");
const produkModel = require("../models/produk");
const { v4: uuidv4 } = require('uuid');

const addCheckout = async (req, res) => {
  const { idmetodepembayaran, totalproduk, totalharga } = req.body;
  const { idproduk } = req.params;
  const idpembeli = req.id;
  const status = "belum bayar";

  try {
    const id = await uuidv4();
    const data = {
      id,
      idpembeli,
      idproduk,
      idmetodepembayaran,
      totalproduk,
      totalharga,
      status,
    };
    const [produk] = await produkModel.getProdukByID(idproduk);
    if (produk.length > 0) {
      const jumlahStok = produk[0].jumlah_stok;
      const stokTerkini = jumlahStok - data.totalproduk;
      await produkModel.updateStokProduk(stokTerkini, data.idproduk);
      await modelCheckout.addCheckout(
        data.id,
        data.idpembeli,
        data.idproduk,
        data.idmetodepembayaran,
        data.totalproduk,
        data.totalharga,
        data.status
      );
      res.json({
        message: "berhasil menambahkan checkout",
        data: data,
      });
    } else {
      res.status(404).json({
        message: "produk tidak ditemukan",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "serve error",
      serverMessage: error.message,
    });
  }
};

const getCheckout = async (req, res) => {
  const idpembeli = req.id;
  try {
    const [dataCheckout] = await modelCheckout.getRiwayatCheckout(idpembeli);
    if (dataCheckout.length > 0) {
      res.json({
        message: "menampilkan riwayat checkout",
        data: dataCheckout,
      });
    } else {
      res.status(404).json({
        message: "tidak ada riwayat checkout",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (status === "dibatalkan") {
      const [dataCheckout] = await modelCheckout.getCheckoutByID(id);
      const jumlahYangDibeli = dataCheckout[0].total_produk;
      const idproduk = dataCheckout[0].id_produk;
      const [dataProduk] = await produkModel.getProdukByID(idproduk);
      const jumlahStokProduk = dataProduk[0].jumlah_stok;
      const jumlahTerkini = jumlahStokProduk + jumlahYangDibeli;
      await produkModel.updateStokProduk(jumlahTerkini, idproduk);
      await modelCheckout.updateStatus(id, status);
      res.json({
        message: "checkout dibatalkan",
      });
    } else if (status === "dibayar") {
      await modelCheckout.updateStatus(id, status);
      res.json({
        message: "berhasil mengubah status checkout",
      });
    } else {
      res.status(400).json({
        message:
          "Status checkout tidak valid. Gunakan 'dibatalkan' atau 'dibayar'.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  addCheckout,
  getCheckout,
  updateStatus,
};
