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

    if (request.body.children && request.body.children.length) {

      logger.info('Checking if provided child topics actually exist in the database...', 'Provided child topics:', request.body.children);
      const existing = await db.getTopics({
        only: request.body.children,
      });

      if (existing.length !== request.body.children.length) {

        throw new Error(`Some of the provided child topics are unknown. The only ones existing in the database are [${existing.map((v:any) => v._id).join(', ')}].`);
      }
    }

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

export {
  getTopics,
  createTopic,
}
