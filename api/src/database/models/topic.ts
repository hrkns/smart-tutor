const mongoose = require('mongoose');
const TopicModelSchema = {
  title: String,
  description: String,
  content: String,
  files: Array,
  children: Array,
};

export {
  TopicModelSchema
};
