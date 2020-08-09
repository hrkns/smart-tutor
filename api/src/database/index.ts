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
  limit,
  exclude
}: {
  keywords: string,
  limit: string,
  exclude: string[],
}) {

  let condition: {
    $and ? : any[],
  };

  condition = {};

  if (keywords) {
    const splittedKeywords = keywords.split(' ')
      .map(s => s.trim())
      .filter(s => s.length)

    condition.$and = [{
      $or: splittedKeywords.map(s => {
        return {
          title: {
            $regex: `.*${s}.*`,
            $options: '-i',
          }
        }
      })
    }];
  }

  exclude = exclude ? (exclude.map(s => s.trim()).filter(s => s.length)) : [];

  if (exclude && exclude.length) {

    if (!condition.$and) {

      condition.$and = [];
    }

    condition.$and.push({
      _id : {
        $nin : exclude
      }
    });
  }

  let query = TopicModel.find(condition, {
    title: 1,
    _id: 1,
  });

  if (limit) {

    query = query.limit(Number(limit));
  }

  return await query.exec();
};

export {
  getTopics
};
