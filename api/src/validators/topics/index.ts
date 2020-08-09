const {
  query,
  validationResult
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
  })
];

const _ = (request: any, response: any, next: any) => {

  const errors = validationResult(request);

  if (!errors.isEmpty()) {

    return response.status(400)
      .json({
        errors: errors.array()
      });
  } else {

    return next();
  }
};

const validateGetTopicsQueryParameters = _;

export {
  getTopicsQueryParametersRules,
  validateGetTopicsQueryParameters
}
