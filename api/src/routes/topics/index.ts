import {
  apiUrlPrefix
} from '../../utils';
import {
  getTopics
} from '../../controllers/topics';

const setTopicRoutes = function(app: any){

  app.get(`${apiUrlPrefix}topics`, getTopics);
};

export default setTopicRoutes;
