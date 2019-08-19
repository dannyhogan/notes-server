const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      author,
      note
    } = req.body;

    Note
      .create({ title, author, note })
      .then(note => res.send(note))
      .catch(next);
  });
