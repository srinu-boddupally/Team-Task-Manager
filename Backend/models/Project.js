const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, refcd: "User" }]
});

module.exports = mongoose.model("Project", projectSchema);