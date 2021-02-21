const mongoose = require("mongoose");
const fs = require('fs');
const parse = require('csv-parse');
const Word = require('../database/models/Word');
const uri = "mongodb://localhost/anagrams";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

async function saveRecord(row) {
  const record = new Word({
    word: row,
    language: "eng"
  })
  await record.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`saved ${row}}`)
    }
  });
};

async function closeConnection(connection) {
  await console.log('mongoose connection disconnected');
  connection.close();
};

async function writeToDB() {
  const connection = await mongoose.connect(uri, options);
  return fs.readFile(__dirname + '/data.csv', { encoding: 'utf8' },
    function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('parsing data')
        parse(data, {
          delimiter: '\n'
        }, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            for (let i = 0; i < data.length; i++) {
              if (i === data.length - 1) {
                saveRecord(data[i].toString());
                closeConnection(connection);
              } else {
                saveRecord(data[i].toString());
              }
            }
          }
        })
      }
    })
};

module.exports = { writeToDB };