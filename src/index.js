require("dotenv").config();
const PORT = process.env.SERVE;
const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/auth.routes");
const pembeliRoute = require("./routes/pembeli.routes");
const penjualRoute = require("./routes/penjual.routes");
const adminRoute = require("./routes/admin.routes");

app.use(cors());
app.use(express.json());
app.use("/auth-api", authRoute);
app.use("/pembeli-api", pembeliRoute);
app.use("/penjual-api", penjualRoute);
app.use("/admin-api", adminRoute);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
