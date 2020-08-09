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

async function getTopics({
  keywords,
  limit
}: {
  keywords: string,
  limit: string
}) {

  let condition = {};

  if (keywords) {
    const splittedKeywords = keywords.split(' ')
      .map(s => s.trim())
      .filter(s => s.length)

    condition = {
      $or: splittedKeywords.map(s => {
        return {
          title: {
            $regex: `.*${s}.*`,
            $options: '-i',
          }
        }
      })
    };
  }

  let query = await TopicModel.find(condition, {
      title: 1,
      _id: 1,
    })
    .exec();

  if (limit) {

    query = query.limit(limit);
  }

  return query;
};

export {
  getTopics
};
