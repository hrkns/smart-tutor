import {
  apiUrlPrefix
} from '../../utils';
import {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters
} from '../../validators/topics/';
import {
  getTopics
} from '../../controllers/topics';

const setTopicRoutes = function(app: any) {

  app.get(`${apiUrlPrefix}topics`, getTopicsQueryParametersRules, validateGetTopicsQueryParameters, getTopics);
};

export default setTopicRoutes;
