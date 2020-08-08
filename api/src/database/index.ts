import Configuration from '../configuration';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const databaseConfiguration = Configuration.Mongo;
const Models = {
  Topic : new Schema({
    _id: ObjectId,
    title: String,
    description: String,
    content: String,
    files: Array,
    children: Array,
  }),
}

const connection = mongoose.connect(`mongodb+srv://${databaseConfiguration.User}:${databaseConfiguration.Password}@${databaseConfiguration.Host}/${databaseConfiguration.Database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TopicModel = mongoose.model('topics', Models.Topic);

async function getTopics(parameters?: any) {

  const a = await TopicModel.find({}).exec();
  return a;
};

export {
  getTopics
};
