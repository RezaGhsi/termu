const Music = require("./../models/musicModel");

exports.getAllSongs = async (req, res) => {
  try {
    const musics = await Music.find().lean();
    res.json(
      musics.map((music) => ({
        id: music._id,
        title: music.title,
        artist: music.artist,
        duration: music.duration,
        coverUrl: `${process.env.HOST}/public/uploads/images/${music.coverFileName}`,
        musicUrl: `${process.env.HOST}/download/music/${music.musicFileName}`,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMusicById = async (req, res) => {
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
      coverUrl: `${process.env.HOST}/public/uploads/images/${music.coverFileName}`,
      musicUrl: `${process.env.HOST}/download/music/${music.musicFileName}`,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
