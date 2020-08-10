import * as db from '../../database';
import {
  logger
} from '../../logging';

async function getTopics(request: any, response: any) {

  try {

    logger.info('Querying topics...', 'Parameters:', request.query);
    const result = db.getTopics(request.query);
    response.json(await result);
    logger.success('Topics returned!', result);
  } catch (e) {

    logger.error('Error querying topics.', e.message);
    response.status(400)
      .json(e.message);
  }
};

async function createTopic(request: any, response: any) {

  try {

    logger.info('Creating topic...', 'Payload:', request.body);
    const result = db.createTopic(request.body);
    response.json(await result);
    logger.success('Topic created!', result);
  } catch (e) {

    logger.error('Error creating topic.', e.message);
    response.status(400)
      .json(e.message);
  }
};

export {
  getTopics,
  createTopic,
}
