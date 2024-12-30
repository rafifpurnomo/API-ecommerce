const modelKeranjang = require("../models/keranjang");
const modelProduk = require("../models/produk");

const addKeranjang = async (req, res) => {
  const { totalproduk, totalharga } = req.body;
  const { idproduk } = req.params;
  const idpembeli = req.id;

  try {
    const [found] = await modelProduk.getProdukByID(idproduk);
    if (found.length > 0) {
      await modelKeranjang.addKeranjang(
        idpembeli,
        idproduk,
        totalproduk,
        totalharga
      );
      res.json({
        message: "Berhasil menambahkan produk ke keranjang",
      });
    } else {
      res.status(404).json({
        message: "produk tidak ada",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error.message,
    });
  }
};

const deleteBarangFromKeranjang = async (req, res) => {
  const { id } = req.params;
  try {
    const [found] = await modelKeranjang.getBarangFromKeranjang(id);
    if (found.length > 0) {
      await modelKeranjang.deleteBarangFromKeranjang(id);
      res.json({
        message: "Berhasil menghapus produk dari keranjang",
      });
    } else {
      res.status.json({
        message: "produk tidak ada di keranjang",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error.message,
    });
  }
};

const getKeranjangByIdPembeli = async (req, res) => {
  const idpembeli = req.id;
  try {
    const [dataKeranjang] = await modelKeranjang.getKeranjangByIdPembeli(
      idpembeli
    );
    if (dataKeranjang.length > 0) {
      res.json({
        message: "menampilkan barang di keranjang",
        data: dataKeranjang,
      });
    } else {
      res.status(404).json({
        message: "keranjang belanja kosong",
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
  addKeranjang,
  deleteBarangFromKeranjang,
  getKeranjangByIdPembeli,
};
