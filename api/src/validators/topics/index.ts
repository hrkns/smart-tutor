const {
  query,
  validationResult,
  body,
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
    .withMessage(`'children' body field, if provided, must have every string item as non empty.`),
];

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

export {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters,
  newTopicBodyFieldsRules,
  validateNewTopicBodyFields,
}
