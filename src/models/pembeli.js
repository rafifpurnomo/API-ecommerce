const conn = require("../config/db_config");
const bcrypt = require("bcrypt");

const getAllPembeli = () => {
  const QUERY = "SELECT * FROM pembeli";
  return conn.execute(QUERY);
};

const getPembeliByEmail = async (email) => {
  const QUERY = "SELECT * FROM pembeli WHERE email = ?";
  return conn.execute(QUERY, [email]);
};

const addPembeli = async (
  first_name,
  last_name,
  email,
  password,
  no_telpon
) => {
  const saltRounds = 10;
  const role = "pembeli";
  const hashedPass = await bcrypt.hash(password, saltRounds);
  const QUERY =
    "INSERT INTO pembeli (first_name, last_name, email, password, no_telpon, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
  return conn.execute(QUERY, [
    first_name,
    last_name,
    email,
    hashedPass,
    no_telpon,
    role,
  ]);
};

module.exports = {
  getAllPembeli,
  getPembeliByEmail,
  addPembeli,
};
