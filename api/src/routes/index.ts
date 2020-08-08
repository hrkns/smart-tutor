import {
  getTopics
} from './topics/';

const urlPrefix = '/';

const SetRoutes = (app: any) => {

  app.get(`${urlPrefix}topics`, getTopics);
};

export default SetRoutes;
