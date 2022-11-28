/* eslint-disable no-nested-ternary */
import axios, { Method } from 'axios';
import { isSuccessCode } from './apiUtil';

export class ApiService {
  private headers = {};
  private baseUrl = 'https://5fc9346b2af77700165ae514.mockapi.io';

  public setHeaders(headers: object, isOverride?: boolean) {
    if (isOverride) {
      this.headers = headers;
    } else {
      this.headers = { ...this.headers, ...headers };
    }
  }

  public getHeaders(): object {
    return this.headers;
  }

  public start(method: string, url: string) {
    return new Promise((resolve, reject) => {
      axios({
        method  : method as Method,
        baseURL : this.baseUrl,
        headers : this.getHeaders(),
        url
      })
        .then((response) => {
          if (isSuccessCode(response.status)) {
            return resolve(response.data);
          }

          return reject({ error: { message: 'Bir Hata Oluştu', ...response.data } });
        })
        .catch((error) =>
          reject({
            error: error?.response?.data
              ? {
                  message: error.response.data?.message || 'Bir Hata Oluştu',
                  ...error.response,
                  ...error.response.data,
                  url
                }
              : error?.message && error?.code
              ? {
                  message: error.message || 'Bir Hata Oluştu',
                  ...error
                }
              : { message: 'Lütfen Internet Bağlantınızı kontrol ediniz.' }
          })
        );
    });
  }
}
