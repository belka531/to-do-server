// libraries
const _ = require('lodash');

// models
const db = require('../models');
const Element = db.elements;

exports.create = (req, res) => {

  const { body } = req;
  const { name } = body;

  // Validate request
  if (!name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const element = Element.create({
    name,
    active: true
  }).then(data => {
    res.status(200).send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the element."
      });
    });

  return element;
};

exports.findAll = (req, res) => {

  Element.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    });
};

exports.findAllActive = (req, res) => {
  Element.findAll({ where: { active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    });
};

exports.findAllCompleted = (req, res) => {
  Element.findAll({ where: { active: false } })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving elements."
      });
    });
};

exports.update = (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { active } = body;

  Element.update({ active }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Element was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update element with id=${id}. Maybe element was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating element with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const { params } = req;
  const { id } = params;

  Element.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Element was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete element with id=${id}. Maybe element was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete element with id=" + id
      });
    });
};

exports.deleteCompleted = (req, res) => {

  Element.destroy({
    where: { active: false }
  })
    .then(num => {
      if (num >= 1) {
        res.status(200).send({
          message: "Elements was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete elements. Maybe elements were not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete elements"
      });
    });
};