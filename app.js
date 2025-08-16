const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const musicRoutes = require("./routes/musicRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const downloadRoutes = require("./routes/downloadRoutes");

const connectDB = require("./configs/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(
  "public/uploads/musics",
  express.static(path.join(__dirname, "public/uploads/musics"))
);

app.use("/download/music/", downloadRoutes);
app.use("/music", musicRoutes);
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

app.use((err, req, res, next) => {
  if (!err) return next();

  if (err instanceof multer.MulterError) {
    return res.status(err.status || 400).json({ error: err.message });
  }
  return res
    .status(err.status || 500)
    .json({ error: err.message || "server error!" });
});

const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`Running On Port ${port}`);
  });
});
