import { query, body } from 'express-validator/check';
import {
  ID_MUST_CONTAIN,
  MAX_LENGTH,
  ONFACT_MUST_BE,
  TITLE_MUST_BE,
  SPECIAL_SIMBOLS_IN_TITLE,
  TITLE_NO_SPACES,
  DESCRIPTION,
  STATUS_MUST_BE,
  PRIORITY_ONLY,
} from '@src/constants/validatorsConstants';
import { TODO } from '@src/constants/otherConstants';

export const changeTodoValidator = [
  query('id')
    .custom(value => !/\s/.test(value))
    .withMessage(ID_MUST_CONTAIN),
  query('id')
    .isLength({ min: 24, max: 25 })
    .withMessage(MAX_LENGTH),
  query('id')
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(ID_MUST_CONTAIN),
  body('onFact')
    .optional()
    .custom(value => /^[1-9]+$/.test(value))
    .withMessage(ONFACT_MUST_BE),
  body('title')
    .optional()
    .isLength({ min: 5 })
    .withMessage(TITLE_MUST_BE),
  body('title')
    .optional()
    .custom(value => !/\s/.test(value))
    .withMessage(TITLE_NO_SPACES),
  body('title')
    .optional()
    .custom(value => /^[a-zA-Z]+$/.test(value))
    .withMessage(
      SPECIAL_SIMBOLS_IN_TITLE,
    ),
  body('description')
    .optional()
    .custom(value => /^[a-zA-Z0-9]+$/.test(value))
    .withMessage(DESCRIPTION.NO_SPECIAL),
  body('description')
    .optional()
    .isLength({ min: 5 })
    .withMessage(DESCRIPTION.MIN),
  body('status')
    .optional()
    .custom(
      (value) => {
        return value === TODO.status.started ||
              value === TODO.status.ended ||
              value === TODO.status.blocked;
      },
    )
    .withMessage(STATUS_MUST_BE),
  body('success')
    .optional()
    .custom(value => value === 'true' || value === 'false')
    .withMessage(STATUS_MUST_BE),
  body('priority')
    .optional()
    .custom(value => /^[0-2]$/.test(value))
    .withMessage(PRIORITY_ONLY),
];
