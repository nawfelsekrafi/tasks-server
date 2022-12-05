const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/commentController");
const authController = require("../../controllers/authController");
// const {
//   createUser,
//   updateUser,
//   getUsers,
//   checkUserId,
// } = require("./schemas/userSchemas");
const { schemaValidator } = require("../../middlewares/schemaValidator");


module.exports = router;