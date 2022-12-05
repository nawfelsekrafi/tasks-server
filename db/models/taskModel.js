const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        isCompleted : {
            type: Boolean,
            default: false
        },
        
       //TODO comment
       //TODO user
        deletedAt: Date
    },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Task", taskSchema);