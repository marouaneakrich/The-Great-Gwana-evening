const { Artist } = require('../models');

exports.getAllArtists = async (req, res, next) => {
  try {
    const { search } = req.query;
    const where = search ? {
      name: { [require('sequelize').Op.iLike]: `%${search}%` }
    } : {};
    
    const artists = await Artist.findAll({
      where,
      order: [['performance_time', 'ASC']]
    });
    res.json(artists);
  } catch (error) {
    next(error);
  }
};

exports.getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    next(error);
  }
};

exports.createArtist = async (req, res, next) => {
  try {
    const { name, bio, photo_url, performance_time } = req.body;
    const artist = await Artist.create({ name, bio, photo_url, performance_time });
    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    await artist.update(req.body);
    res.json(artist);
  } catch (error) {
    next(error);
  }
};

exports.deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    await artist.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};