const modelProduk = require("../models/produk");

const getAllProduk = async (req, res) => {
  try {
    const [dataProduk] = await modelProduk.getAllProduk();
    if (dataProduk.length > 0) {
      res.json({
        message: "menampilkan semua produk",
        data: dataProduk,
      });
    } else {
      res.status(404).json({
        message: "tidak ada data produk",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const getAllProdukByIdPenjual = async (req, res) => {
  const { id_penjual } = req.params;
  try {
    const [dataProduk] = await modelProduk.getAllProdukByIdPenjual(id_penjual);
    if (dataProduk.length > 0) {
      const nama_toko = dataProduk[0].nama_toko;
      res.json({
        message: `menampilkan produk ${nama_toko}`,
        data: dataProduk,
      });
    } else {
      res.status(404).json({
        message: "penjual belum memposting produk",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const addProduk = async (req, res) => {
  const { nama_barang, jumlah_stok, harga_barang, id_kategori } = req.body;
  let foto_produk = null;
  const id_penjual = req.id;

  try {
    if (req.file) {
      foto_produk = req.file;
    } else {
      foto_produk = null;
    }

    const data = {
      id_penjual,
      foto_produk,
      nama_barang,
      jumlah_stok,
      harga_barang,
      id_kategori,
    };
    await modelProduk.addProduk(
      data.id_penjual,
      data.foto_produk,
      data.nama_barang,
      data.jumlah_stok,
      data.harga_barang,
      data.id_kategori
    );
    res.json({
      message: "berhasil menambahkan produk",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "serve error",
      serverMessage: error,
    });
  }
};

const deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    const [produk] = await modelProduk.getProdukByID(id);
    if (produk.length > 0) {
      await modelProduk.deleteProduk(id);
      res.json({
        message: "Berhasil menghapus produk",
      });
    } else {
      res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      serverMessage: error.message,
    });
  }
};

const updateStokProduk = async (req, res) => {
  const { id } = req.params;
  const { stok } = req.body;

  try {
    await modelProduk.updateStokProduk(stok, id);
    res.json({
      message: "Berhasil mengedit stok produk",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllProduk,
  getAllProdukByIdPenjual,
  addProduk,
  deleteProduk,
  updateStokProduk,
};
