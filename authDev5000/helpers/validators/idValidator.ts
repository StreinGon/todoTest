const { query } = require('express-validator/check');

const idValidator = [
  query('id')
    .custom((value) => {
      return !/\s/.test(value);
    })
    .withMessage('id must contain only numbers and latin chars'),
  query('id')
    .isLength({ min: 24, max: 25 })
    .withMessage('Length of id must be 24-25 chars'),
  query('id')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage('id must contain only numbers and latin chars'),
];

export { idValidator };
