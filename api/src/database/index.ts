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

/**@description Get a list of topics from the Mongo Database.
 * @param{string} keywords list of strings separated by blank spaces that will serve for filtering the search results.
 * @param{string} limit the maximum amount of topics the query will return
 * @param{string[]} exclude an array of string that represents the IDs of the records that we don't want be ignored in the query
 * @param{string[]} only an array of string that represents the IDs of the only record we want to get from the database
 */
async function getTopics({
  keywords,
  limit,
  exclude,
  only,
}: {
  keywords ? : string,
  limit ? : string,
  exclude ? : string[],
  only ? : string[],
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

  exclude = exclude ? (exclude.map(s => s.trim())
    .filter(s => s.length)) : [];

  if (exclude && exclude.length) {

    if (!condition.$and) {

      condition.$and = [];
    }

    condition.$and.push({
      _id: {
        $nin: exclude
      }
    });
  }

  only = only ? (only.map(s => s.trim())
    .filter(s => s.length)) : [];

  if (only && only.length) {

    if (!condition.$and) {

      condition.$and = [];
    }

    condition.$and.push({
      _id: {
        $in: only
      }
    });
  }

  let query = TopicModel.find(condition, {
    _id: 1,
    title: 1,
    description: 1,
  });

  if (limit) {

    query = query.limit(Number(limit));
  }

  return await query.exec();
};

/**@description Insert a new document in the 'topics' collection
 * @param{string} title Name of the topic
 * @param{string} description A brief summary of the topic
 * @param{string} content Extensive information of the topic
 * @param{string[]} children An ordered list of the child topics, referenced by their IDs
*/
async function createTopic({
  title,
  description,
  content,
  children,
}: {
  title: string,
  description ? : string,
  content ? : string,
  children ? : string[],
}) {

  return await TopicModel.create({
      title: title,
      description: (description && description.trim() ? description.trim() : ''),
      content: (content && content.trim()
        .length ? content.trim() : ''),
      children: (children && children.length ? children : []),
    });
}

export {
  getTopics,
  createTopic,
};
