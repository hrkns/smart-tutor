import * as db from '../database';
import {
  logger
} from '../logging';

async function getTopics(request: any, response: any) {

  try {

    logger.info('Querying topics...');
    response.json(await db.getTopics());
    logger.success('Topics returned!');
  } catch (e) {

    logger.error(e.message);
  }
};

export {
  getTopics,
}
