const express = require("express");
const musicRoutes = require("./routes/musicRoutes");
const connectDB = require("./configs/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/download/music",
  express.static(path.join(__dirname, "public/uploads/musics"))
);
app.use(
  "/covers",
  express.static(path.join(__dirname, "public/uploads/cover"))
);

app.use("/music", musicRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 4040, (err) => {
    if (err) throw err;
    console.log(`Running On Port ${process.env.PORT || 4040}`);
  });
});
