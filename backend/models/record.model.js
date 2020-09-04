const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recordSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    subject: {
      type: String,
    },
    marks: {
      type: Number,
    },
    standard: {
      type: Number,
    },
  },
  {
    collection: "records",
  }
);

module.exports = mongoose.model("Record", recordSchema);
