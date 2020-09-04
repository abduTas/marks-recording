let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Record Model
let recordSchema = require("../models/record.model.js");

// CREATE record
router.route("/create-record").post((req, res, next) => {
  recordSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ records
router.route("/").get((req, res) => {
  recordSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single record
router.route("/edit-record/:id").get((req, res) => {
  recordSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update record
router.route("/update-record/:id").put((req, res, next) => {
  recordSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("record updated successfully !");
      }
    }
  );
});

// Delete record
router.route("/delete-record/:id").delete((req, res, next) => {
  recordSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
