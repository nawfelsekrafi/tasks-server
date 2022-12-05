const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String, 
            trim: true
        },
        //TODO user

    },
    {
        timestamps: true,
      }
)

commentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Comment", commentSchema);