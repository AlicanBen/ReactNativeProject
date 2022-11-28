import { Api, SimpsonApi } from '../apis';

import { getManufacturer } from '../common/utils/deviceInfoUtil';

let nativeHeaders;

export const initNativeHeader = () => {
  getManufacturer(() => {
    nativeHeaders = {};
  });
};

export const headers = (accept: string, acceptLanguage: string) => ({
  Accept            : accept,
  'Content-Type'    : 'application/json',
  'Accept-Language' : acceptLanguage,
  ...nativeHeaders
});

Api.setHeaders(headers('application/json', ''));

export const simpsonApi = SimpsonApi;
