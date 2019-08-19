require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');

describe('notes route test', () => {

  beforeAll(() => {
    connect();
  });

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let note = null;
  beforeEach(async() => {
    note = JSON.parse(JSON.stringify(await Note.create({ title: 'Note', note: 'Hello world' })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a note using POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'Note', note: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Note',
          note: 'test',
          __v: 0
        });
      });
  });

  it('can get all notes', async() => {
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          title: note.title,
          note: note.note,
          __v: 0
        });
      });
  });

});
