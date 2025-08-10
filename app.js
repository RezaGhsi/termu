const express = require("express");
const musicRoutes = require("./routes/musicRoutes");
const userRoutes = require("./routes/userRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const connectDB = require("./configs/db");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(
  "/covers",
  express.static(path.join(__dirname, "public/uploads/cover"))
);

app.use("/download/music/", downloadRoutes);
app.use("/music", musicRoutes);
app.use("/user", userRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 4040, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`Running On Port ${process.env.PORT || 4040}`);
  });
});
