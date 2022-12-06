const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    // Parent Referencing
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must has a user who did create it"],
    },
    task: {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
      required: [true, "Comment must has a related task"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
