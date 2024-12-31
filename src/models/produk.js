const conn = require("../config/db_config");

const getAllProduk = () => {
  const QUERY = `
  SELECT 
    produk.id AS id_produk,
    produk.nama_barang,
    produk.foto_produk,
    produk.jumlah_stok,
    produk.harga_barang,
    penjual.nama_toko,
    kategori.kategori AS kategori_barang
  FROM 
      produk
  JOIN 
      penjual ON produk.id_penjual = penjual.id
  JOIN 
      kategori ON produk.id_kategori = kategori.id;
  `;
  return conn.execute(QUERY);
};

const getAllProdukByIdPenjual = (id_penjual) => {
  const QUERY = `
  SELECT 
    produk.id AS id_produk,
    produk.nama_barang,
    produk.foto_produk,
    produk.jumlah_stok,
    produk.harga_barang,
    penjual.nama_toko,
    kategori.kategori AS kategori_barang
  FROM 
    produk
  JOIN 
    penjual ON produk.id_penjual = penjual.id
  JOIN 
    kategori ON produk.id_kategori = kategori.id
  WHERE
    produk.id_penjual = ?;
  `;
  return conn.execute(QUERY, [id_penjual]);
};

const getProdukByID = (id) => {
  const QUERY = `
  SELECT 
    produk.id AS id_produk,
    produk.nama_barang,
    produk.foto_produk,
    produk.jumlah_stok,
    produk.harga_barang,
    penjual.nama_toko,
    kategori.kategori AS kategori_barang
  FROM 
    produk
  JOIN 
    penjual ON produk.id_penjual = penjual.id
  JOIN 
    kategori ON produk.id_kategori = kategori.id
  WHERE
    produk.id = ?;
  `;
  return conn.execute(QUERY, [id]);
};

const addProduk = (
  id_penjual,
  foto_produk,
  nama_barang,
  jumlah_stok,
  harga_barang,
  id_kategori
) => {
  const QUERY =
    "INSERT INTO produk (id_penjual, foto_produk, nama_barang, jumlah_stok, harga_barang, id_kategori) VALUES (?, ?, ?, ?, ?, ?)";
  return conn.execute(QUERY, [
    id_penjual,
    foto_produk,
    nama_barang,
    jumlah_stok,
    harga_barang,
    id_kategori,
  ]);
};

const deleteProduk = (id) => {
  const QUERY = "DELETE FROM produk WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

const updateStokProduk = (stok, id) => {
  const QUERY = "UPDATE produk SET jumlah_stok = ? WHERE id = ? ";
  return conn.execute(QUERY, [stok, id])
}

module.exports = {
  getAllProduk,
  getAllProdukByIdPenjual,
  getProdukByID,
  addProduk,
  deleteProduk,
  updateStokProduk,
};
