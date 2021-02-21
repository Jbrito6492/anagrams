const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WordSchema = new Schema({
  id: ObjectId,
  word: String,
  language: { type: String, default: "eng" }
});

module.exports = mongoose.model('Word', WordSchema);
