/* eslint-disable */
// @ts-nocheck
import * as url from 'url';

import { ApiService } from './api';

export const Api = new ApiService();

export const SimpsonApi = (() => {
  return {
    getSimpsons() {
      const localVarPath = `/simpsons`;
      const localVarUrlObj = url.parse(localVarPath, true);

      const localVarQueryParameter = {};

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter);

      delete localVarUrlObj.search;

      return Api.start('get', url.format(localVarUrlObj));
    }
  };
})();
