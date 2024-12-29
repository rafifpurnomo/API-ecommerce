const conn = require("../config/db_config");
const bcrypt = require("bcrypt");

const getAlladmin = () => {
    const QUERY = "SELECT * FROM admin";
    return conn.execute(QUERY);
}

const getadminByEmail = (email) => {
    const QUERY = "SELECT * FROM admin WHERE email = ?";
    return conn.execute(QUERY, [email]);
}

const addAdmin = async (
  first_name,
  last_name,
  email,
  password,
  no_telpon
) => {
  const saltRounds = 10;
  const role = "admin";
  const hashedPass = await bcrypt.hash(password, saltRounds);
  const QUERY =
    "INSERT INTO admin (first_name, last_name, email, password, no_telpon, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
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
    getAlladmin,
    getadminByEmail,
    addAdmin,
}