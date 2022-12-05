const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/",authRoutes);
router.use("/users",userRoutes)
router.use("/tasks",taskRoutes)
router.use("/comments",commentRoutes)


module.exports = router;
