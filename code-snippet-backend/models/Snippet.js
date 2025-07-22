const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  language: String,
  tags: [String],
  description: String,
  isPublic: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Snippet", SnippetSchema);
