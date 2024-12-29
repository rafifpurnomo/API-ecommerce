require("dotenv").config();
const PORT = process.env.SERVE;
const express = require("express");
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
