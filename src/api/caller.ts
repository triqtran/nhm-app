import axios from 'axios';
import { config, storage } from 'common';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_DELETE = 'delete';

export type ResponseData<T> = {
  success?: boolean;
  data: T;
}

export type ApiResponseData<T> = {
  status: number;
  data: ResponseData<T>;
}

export type ApiResponse<T> = {
  status: number;
  data: T;
};

async function requestAPI(
  method: string,
  url: string,
  headers: object = {
    'Content-Type': 'application/json',
  },
  dataBody: object = {},
  baseUrl: string = config.BASE_URL,
): Promise<ApiResponse<any>> {
  try {
    const config: { [k: string]: any } = {
      url: `${baseUrl}${url}`,
      headers: { ...headers },
      method,
    };

    // Set token to header
    const accessToken = await storage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (method === METHOD_GET) {
      config.params = dataBody;
    } else {
      config.data = dataBody;
    }
    return axios({ ...config, timeout: 10000 });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const caller = {
  get(
    url: string,
    data: any = null,
    headers: object = {},
    baseUrl: string = config.BASE_URL,
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_GET, url, headers, data, baseUrl)
      .catch((e: any) => { throw e; });
  },

  post(
    url: string,
    // data: string | FormData | undefined,
    data?: any,
    headers?: object,
    baseUrl: string = config.BASE_URL,
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_POST, url, headers, data, baseUrl)
      .then((value: any) => {
        return value;
      })
      .catch((e: any) => { throw e; });
  },

  put(
    url: string,
    data?: any,
    headers?: object,
    baseUrl: string = config.BASE_URL,
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_PUT, url, headers, data, baseUrl);
  },

  delete(
    url: string,
    data?: any,
    headers?: object,
    baseUrl: string = config.BASE_URL,
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_DELETE, url, headers, data, baseUrl);
  },
};

export default caller;
