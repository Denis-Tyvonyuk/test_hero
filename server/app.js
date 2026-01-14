const express = require("express");
const cors = require("cors");
const herosRoute = require("./routes/heros");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes
app.use("/heros", herosRoute);

// health check (optional but useful)
app.get("/", (_req, res) => {
  res.send("API is running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
