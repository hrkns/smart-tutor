const mongoose = require('mongoose');
const TopicModelSchema = {
  _id: mongoose.Schema.ObjectId,
  title: String,
  description: String,
  content: String,
  files: Array,
  children: Array,
};

export {
  TopicModelSchema
};
