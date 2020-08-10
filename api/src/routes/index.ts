import setTopicRoutes from './topics/';
import { response } from 'express';

const SetRoutes = (app: any) => {

  setTopicRoutes(app);

  app.use('/*', (request:any, response:any) => {

    response.status(404).json({
      message:'Route not found.'
    })
  });
};

export default SetRoutes;
