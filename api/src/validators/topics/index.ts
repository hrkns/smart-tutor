import * as db from '../../database';
const mongoose = require('mongoose');
const {
  query,
  validationResult,
  body,
  // some aditional imports?
} = require('express-validator');

const getTopicsQueryParametersRules: any[] = [

  /* ******************** */
  query('keywords')
    .optional()
    .isString()
    .withMessage(`'keywords' query parameter, if provided, must be a string.`)
    .trim()
    .isLength({
      min: 1
    })
    .withMessage(`'keywords' query parameter, if provided, must be non empty.`),

  /* ******************** */
  query('limit')
    .optional()
    .isInt({
      min: 1
    })
    .withMessage(`'limit' query parameter, if provided, must be a numeric value greater than 1.`),

  /* ******************** */
  query('exclude')
    .optional()
    .isString()
    .withMessage(`'exclude' query parameter, if provided, must be a string.`)
    .trim()
    .isLength({
      min: 1
    })
    .withMessage(`'exclude' query parameter, if provided, must be non empty.`),
];

const newTopicBodyFieldsRules: any[] = [
  /* ******************** */
  body('title')
    .isString()
    .withMessage(`'title' body field must be a string.`)
    .trim()
    .isLength({
      min: 1
    })
    .withMessage(`'title' body field must be non empty.`),

  /* ******************** */
  body('description')
    .optional()
    .isString()
    .withMessage(`'description' body field, if provided, must be a string.`)
    .trim()
    .isLength({
      min: 1
    })
    .withMessage(`'description' body field, if provided, must be non empty.`),

  /* ******************** */
  body('content')
    .optional()
    .isString()
    .withMessage(`'content' body field, if provided, must be a string.`)
    .trim()
    .isLength({
      min: 1
    })
    .withMessage(`'content' body field, if provided, must be non empty.`),

  /* ******************** */
  body('children')
    .optional()
    .isArray()
    .withMessage(`'children' body field, if provided, must be an array.`)
    .isLength({
      min: 1
    })
    .withMessage(`'children' body field, if provided, must be non empty.`),

  /* ******************** */
  body('children.*')
    .isString()
    .withMessage(`'children' body field, if provided, must have every item as string`)
    .isLength({
      min: 1
    })
    .withMessage(`'children' body field, if provided, must have every string item as non empty.`)
    .custom((value: string) => {

      try {

        mongoose.Types.ObjectId(value);
        return Promise.resolve();
      } catch (e) {

        return Promise.reject(`"${value}" is not a valid ID.`);
      }
    }),

  /* ******************** */
  body('children')
    .optional()
    .custom(async (values: Array<string>) => {
      const existing = await db.getTopics({
        only: values,
      });

      if (existing.length !== values.length) {

        return Promise.reject(`Some of the provided child topics are unknown. The only ones existing in the database are [${existing.map((v:any) => v._id).join(', ')}].`);
      } else {

        return Promise.resolve();
      }
    })
];

// rules for file validation
// rules for query of single topic
// rules for payload of topic update
// rules for topic deletion

const _ = (request: any, response: any, next: any) => {

  const errors = validationResult(request);

  if (!errors.isEmpty()) {

    return response.status(400)
      .json({
        errors: errors.array()
      });
  } else {

    if (request.query.exclude && request.query.exclude.length) {

      request.query.exclude = request.query.exclude.split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length);
    }

    return next();
  }
};

const validateGetTopicsQueryParameters = _;
const validateNewTopicBodyFields = _;

// definition of the following items 
  // filesValidationMiddleware
  // singleTopicQueryValidation
  // payloadTopicUpdateValidation
  // topicDeletionValidation

export {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters,
  newTopicBodyFieldsRules,
  validateNewTopicBodyFields,

  // imports of the following items
    // filesValidationMiddleware
    // singleTopicQueryValidation
    // payloadTopicUpdateValidation
    // topicDeletionValidation
}
