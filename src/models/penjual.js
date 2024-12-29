const conn = require("../config/db_config");
const bcrypt = require("bcrypt");

const getAllPenjual = () => {
  const QUERY = "SELECT * FROM penjual";
  return conn.execute(QUERY);
};

const getPenjualByEmail = (email) => {
  const QUERY = "SELECT * FROM penjual WHERE email = ?";
  return conn.execute(QUERY, [email]);
};

const getUserByID = async (id) => {
  const QUERY = "SELECT * FROM penjual WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

const addPenjual = async (nama_toko, alamat, email, password, no_telpon) => {
  const saltRounds = 10;
  const hashPass = await bcrypt.hash(password, saltRounds);
  const role = "penjual";
  const QUERY =
    "INSERT INTO penjual (nama_toko, alamat, email, password, no_telpon, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    return conn.execute(QUERY, [
        nama_toko, 
        alamat, 
        email, 
        hashPass, 
        no_telpon,
        role
    ])
};

module.exports = {
  getAllPenjual,
  getPenjualByEmail,
  getUserByID,
  addPenjual,
};
