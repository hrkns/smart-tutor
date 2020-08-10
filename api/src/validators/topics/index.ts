const {
  query,
  validationResult,
  body,
} = require('express-validator');

const getTopicsQueryParametersRules: any[] = [
  query('keywords')
    .optional()
    .isString()
    .trim()
    .isLength({
      min: 1
    }),
  query('limit')
    .optional()
    .isInt({
      min: 1
    }),
  query('exclude')
    .optional()
    .isString()
    .trim()
    .isLength({
      min: 1
    }),
];

const newTopicBodyFieldsRules: any[] = [
  body('title')
    .isString()
    .trim()
    .isLength({
      min: 1
    }),
  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({
      min: 1
    }),
  body('content')
    .optional()
    .isString()
    .trim()
    .isLength({
      min: 1
    }),
  body('children')
    .optional()
    .isArray()
    .isLength({
      min: 1
    }),
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
