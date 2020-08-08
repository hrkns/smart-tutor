import * as db from '../database';

async function getTopics(request: any, response: any) {

  response.json(await db.getTopics());
};

export {
  getTopics,
}
