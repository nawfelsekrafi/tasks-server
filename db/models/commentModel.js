const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Comment", commentSchema);
