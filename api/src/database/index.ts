import {
  TopicModelSchema
} from './models/topic';
import {
  mongoConnectionUrl
} from '../utils';
import {
  Configuration
} from '../configuration';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = {
  Topic: new Schema(TopicModelSchema),
}
const TopicModel = mongoose.model('topics', Models.Topic);

mongoose.connect(mongoConnectionUrl(Configuration.Mongo), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getTopics(parameters ? : any) {

  const a = await TopicModel.find({}, {
      title: 1
    })
    .exec();
  return a;
};

export {
  getTopics
};
