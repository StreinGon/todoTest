export const ID_MUST_CONTAIN = 'id must contain only numbers and latin chars';
export const MAX_LENGTH = 'Length of id must be 24-25 chars';
export const ONFACT_MUST_BE = 'onFact must be integer (>1)';
export const TITLE_MUST_BE = 'Title must be at least 5 chars long';
export const SPECIAL_SIMBOLS_IN_TITLE = 'No special simbols are allowed in the title';
export const CATEGORY_MUST_CONTAIN = 'categoryName must contain only numbers and latin chars';
export const WIDTH = 'width must contain only numbers';
export const HEIGHT = 'height must contain only numbers';
export const TITLE_NO_SPACES = 'No spaces are allowed in the title';
export const STATUS_MUST_BE = 'Status must be true or false';
export const PRIORITY_ONLY = 'priority 0-1-2';
export const INVESTIGATION_INTEGER = 'investigation must be integer(>1)';

export const AMOUNT = {
  numeric:'Amout must be numeric',
  positive:'Amout must be positive',
};

export const START_FROM = {
  numeric:'StartFrom must be numeric',
  positive:'StartFrom must be positive',
};

export const USERNAME = {
  NO_SPACES:'No spaces are allowed in the username',
  NO_SPECIAL:'No special simbols are allowed in the username,Only latin chars',
  MIN:'Username must be at least 5 chars long',
};

export const PASSWORD = {
  NO_SPACES:'No spaces are allowed in the username',
  MIN:'Username must be at least 5 chars long',
};

export const MAIL = {
  LATIN:'Only latin chars',
  ALREADY_IN_USE:'E-mail already in use',
  INCORRECT:'Incorrect mail',
};

export const DESCRIPTION = {
  MIN:'Description must be at least 5 chars long',
  NO_SPECIAL:'No special simbols are allowed in the description,Only latin chars',
};
