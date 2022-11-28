/* eslint-disable */
/**
 * @summary is Success Code
 * @param {} statusCode
 * @export
 */
export const isSuccessCode = (statusCode: number) => {
  return statusCode >= 200 && statusCode < 300;
};
