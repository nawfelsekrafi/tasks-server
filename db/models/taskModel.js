const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title can not be empty!"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description can not be empty!"],
    },
    status: {
      enum: ["todo", "in progress", "completed"],
      default: "todo",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "task must has a user who did create it"],
    },
    sharedWith: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Task", taskSchema);
