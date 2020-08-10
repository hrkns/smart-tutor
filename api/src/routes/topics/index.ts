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
  app.post(`${apiUrlPrefix}topics`, (request:any, response:any, next:any) => {

    console.log('request.body', request.body);
    next();
  }, newTopicBodyFieldsRules, validateNewTopicBodyFields, createTopic);
};

export default setTopicRoutes;
