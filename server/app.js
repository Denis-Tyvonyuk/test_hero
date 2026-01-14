const express = require("express");
const cors = require("cors");
const herosRoute = require("./routes/heros");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/heros", herosRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
