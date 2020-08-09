import * as db from '../../database';
import {
  logger
} from '../../logging';

async function getTopics(request: any, response: any) {

  try {

    logger.info('Querying topics...', request.query);
    response.json(await db.getTopics(request.query));
    logger.success('Topics returned!');
  } catch (e) {

    logger.error('Error querying topics.', e.message);
    response.status(400)
      .json(e.message);
  }
};

export {
  getTopics,
}
