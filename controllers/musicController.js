const multer = require("multer");
const mm = require("music-metadata");
const Music = require("./../models/musicModel");
const middleware = require("./../middlewares/musicMiddleware");
const path = require("path");
const fs = require("fs");

exports.getAllSongs = async (req, res) => {
  try {
    const musics = await Music.find().lean();
    res.json(
      musics.map((music) => ({
        id: music._id,
        title: music.title,
        artist: music.artist,
        duration: music.duration,
        musicUrl: `${process.env.HOST}download/music/${music.fileName}`,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMusicById = async (req, res) => {
  // middleware.objectIdValidation(req.params.id);

  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      res.status(404).json({ error: "Music Not Found!" });
    }
    res.json({
      id: music._id,
      title: music.title,
      artist: music.artist,
      duration: music.duration,
      musicUrl: `${process.env.HOST}download/music/${music.fileName}`,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.uploadOne = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No File Recived!" });
    }

    const songData = await mm.parseFile(req.file.path);

    const newMusic = new Music({
      title: songData.common.title || path.parse(req.file.originalname).name,
      artist: songData.common.artist || "unknown artist",
      album: songData.common.album || "unknown album",
      duration: songData.format.duration,
      fileName: req.file.filename,
    });

    const result = await newMusic.save();

    res.status(200).json({
      message: "File Uploaded Successfully",
      info: newMusic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadMusic = async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "uploads/musics",
      req.params.fileName
    );
    res.setHeader("Content-type", "audio/mpeg");
    res.sendFile(filePath);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
