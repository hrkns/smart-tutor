import {
  apiUrlPrefix
} from '../../utils';
import {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters,
  newTopicBodyFieldsRules,
  validateNewTopicBodyFields,
} from '../../validators/topics/';
import {
  getTopics,
  createTopic
} from '../../controllers/topics';

const setTopicRoutes = function(app: any) {

  app.get(`${apiUrlPrefix}topics`, getTopicsQueryParametersRules, validateGetTopicsQueryParameters, getTopics);
  app.post(`${apiUrlPrefix}topics`, newTopicBodyFieldsRules, validateNewTopicBodyFields, createTopic);
};

export default setTopicRoutes;
