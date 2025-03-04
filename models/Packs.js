const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  learning_description: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  total_durations: {
    type: Number,
  },
  total_videos: {
    type: Number,
  },
  url_video: [
    {
      url: String,
      title: String,
      description: String,
    },
  ],
  level: {
    type: String,
    required: true,
  },
});

const Pack = mongoose.model("Pack", packSchema);
module.exports = Pack;
