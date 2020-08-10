import {
  apiUrlPrefix
} from '../../utils';
import {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters,
  newTopicBodyFieldsRules,
  validateNewTopicBodyFields,
  // more validation imports
} from '../../validators/topics/';
import {
  getTopics,
  createTopic
  // more controllers imports
} from '../../controllers/topics';

const setTopicRoutes = function(app: any) {

  app.get(`${apiUrlPrefix}topics`, getTopicsQueryParametersRules, validateGetTopicsQueryParameters, getTopics);
  app.post(`${apiUrlPrefix}topics`, newTopicBodyFieldsRules, validateNewTopicBodyFields, createTopic);

  // route for uploading files
  // route for getting single topic
  // route for update topic
  // route for delete topic
};

export default setTopicRoutes;
