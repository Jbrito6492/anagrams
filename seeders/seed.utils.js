const mongoose = require("mongoose");
const fs = require('fs');
const parse = require('csv-parse');
const WordSchema = require('../database/models/Word');
const uri = "mongodb://localhost/anagrams";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

async function closeConnection(connection) {
  try {
    await console.log('mongoose connection disconnected');
    connection.disconnect();
  } catch (err) {
    console.log(err);
  }
};

async function writeToDB() {
  const connection = await mongoose.connect(uri, options);
  return fs.readFile(__dirname + '/data.csv', { encoding: 'utf8' },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('parsing data')
        parse(data, {
          delimiter: '\n',
          cast: function (value, context) {
            return { word: value }
          }
        }, async function (err, data) {
          try {
            data = data.flat();
            await WordSchema.insertMany(data);
            closeConnection(connection);
          } catch (err) {
            console.log(err);
          }
        })
      }
    })
};

module.exports = { writeToDB };