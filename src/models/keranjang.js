const conn = require("../config/db_config");

const addKeranjang = (idpembeli, idproduk, totalproduk, totalharga) => {
  const QUERY =
    "INSERT INTO keranjang (id_pembeli, id_produk, total_produk, total_harga) VALUES (?, ?, ?, ?)";
  return conn.execute(QUERY, [idpembeli, idproduk, totalproduk, totalharga]);
};

const getKeranjangByIdPembeli = (idpembeli) => {
  const QUERY = `
    SELECT 
        keranjang.id AS id_keranjang,
        produk.nama_barang,
        produk.foto_produk,
        penjual.nama_toko,
        produk.harga_barang,
        keranjang.total_produk,
        keranjang.total_harga
        
    FROM 
        keranjang
    JOIN 
        produk ON keranjang.id_produk = produk.id
    JOIN 
        penjual ON produk.id_penjual = penjual.id
    WHERE 
        keranjang.id_pembeli = ?;
    `;
  return conn.execute(QUERY, [idpembeli]);
};

const deleteBarangFromKeranjang = (id) => {
  const QUERY = "DELETE FROM keranjang WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

const getBarangFromKeranjang = (id) => {
  const QUERY = "SELECT * FROM keranjang WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

module.exports = {
  addKeranjang,
  getKeranjangByIdPembeli,
  deleteBarangFromKeranjang,
  getBarangFromKeranjang,
};
