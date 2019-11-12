const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    console.log('Created new note');
    const {
      title,
      note,
      color
    } = req.body;

    Note
      .create({ title, note, color })
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    console.log('Requested all notes');
    Note
    
      .find()
      .then(notes => {
        res.send(notes);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    console.log('Deleted note', req.params.id);
    Note
      .findByIdAndDelete(req.params.id)
      .then(deletedNote => res.send(deletedNote))
      .catch(next);
  });
