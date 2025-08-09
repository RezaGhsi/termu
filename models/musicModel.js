const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    coverFileName: {
      type: String,
      required: true,
    },
    musicFileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Music = mongoose.model("Music", schema);

module.exports = Music;
