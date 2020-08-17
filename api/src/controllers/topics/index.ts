import * as db from '../../database';
import {
  logger
} from '../../logging';

async function getTopics(request: any, response: any) {

  try {

    logger.info('Querying topics...', 'Parameters:', request.query);
    const result = await db.getTopics(request.query);
    response.json(result);
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
    const result = await db.createTopic(request.body);
    response.json(result);
    logger.success('Topic created!', result);
  } catch (e) {

    logger.error('Error creating topic.', e.message);
    response.status(400)
      .json(e.message);
  }
};

// controller for upload files to free cloud storage
// controller for get single topic
// controller for topic update
// controller for topic deletion

export {
  getTopics,
  createTopic,
}
