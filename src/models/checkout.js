const conn = require("../config/db_config");

const addCheckout = (
  id,
  idpembeli,
  idproduk,
  idmetodepembayaran,
  totalproduk,
  totalharga,
  Status
) => {
  const QUERY =
    "INSERT INTO checkout (id, id_pembeli, id_produk, id_metode_pembayaran, total_produk, total_harga, status, created_at) VALUES (?, ?,?,?,?,?,?, NOW())";
  return conn.execute(QUERY, [
    id,
    idpembeli,
    idproduk,
    idmetodepembayaran,
    totalproduk,
    totalharga,
    Status,
  ]);
};

const updateStatus = (id, Status) => {
  const QUERY = "UPDATE checkout SET status = ?, update_at = NOW() WHERE id = ?";
  return conn.execute(QUERY, [Status, id]);
};

const getRiwayatCheckout = (idpembeli) => {
  const QUERY = `
    SELECT 
        checkout.id AS id_checkout,
        produk.id AS id_produk,
        produk.foto_produk,
        produk.nama_barang,
        checkout.total_produk,
        checkout.total_harga,
        checkout.status,
        metode_pembayaran.metode AS metode_pembayaran,
        checkout.created_at,
        checkout.update_at
    FROM 
        checkout
    JOIN 
        produk ON checkout.id_produk = produk.id
    JOIN 
        penjual ON produk.id_penjual = penjual.id
    JOIN 
        metode_pembayaran ON checkout.id_metode_pembayaran = metode_pembayaran.id
    WHERE 
        checkout.id_pembeli = ?;
    `;
  return conn.execute(QUERY, [idpembeli]);
};

const getCheckoutByID = (id) => {
  const QUERY = "SELECT * FROM checkout WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

module.exports = {
  addCheckout,
  updateStatus,
  getRiwayatCheckout,
  getCheckoutByID,
};
