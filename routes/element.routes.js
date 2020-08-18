module.exports = app => {
  const elements = require('../controllers/element.controller.js');

  const router = require("express").Router();

  // Create a new element
  router.post("/", elements.create);

  // Find all elements
  router.get("/", elements.findAll);

  // Find all active elements
  router.get("/active", elements.findAllActive);

  // Find all completed elements
  router.get("/completed", elements.findAllCompleted);

  // Update a element with id
  router.put("/:id", elements.update);

  // Delete a element with id
  router.delete("/:id", elements.delete);

  // Delete completed elements
  router.delete("/", elements.deleteCompleted);

  app.use('/api/elements', router);
};