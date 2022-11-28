export const isEmpty = (obj: object) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

function _interopRequireDefault(obj) {
  return obj?.__esModule ? obj : { default: obj };
}

import _isString2 from 'lodash/isString';

import _isPlainObject2 from 'lodash/isPlainObject';

const _isPlainObject3 = _interopRequireDefault(_isPlainObject2);
const _isString3 = _interopRequireDefault(_isString2);

export function isValidKey(key) {
  return [ 'type', 'payload', 'error', 'meta' ].indexOf(key) > -1;
}

export function isFSA(action) {
  return (
    _isPlainObject3.default(action) && _isString3.default(action.type) && Object.keys(action).every(isValidKey)
  );
}

export const order = (a, b) =>
  // eslint-disable-next-line no-nested-ternary
  (a?.order || 0) > (b?.order || 0) ? 1 : (b.order || 0) > (a.order || 0) ? -1 : 0;
