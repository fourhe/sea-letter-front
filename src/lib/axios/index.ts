import axios, {
  AxiosError,
  type AxiosRequestConfig,
  HttpStatusCode,
} from 'axios';

import {getCookieValue} from '@/utils/cookie';

export type ApiError = AxiosError & {
  response?: {
    data: {
      errorCode: string;
      message: string;
    };
  };
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

instance.interceptors.request.use(config => {
  if (typeof document !== 'undefined') {
    const token = getCookieValue('access-token');
    if (token) {
      config.headers.setAuthorization(token);
    }
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  (error: ApiError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      fetch('api/reissue/access-token').catch(() => Promise.reject(error));
    }
    return Promise.reject(error);
  },
);

class Api {
  readonly baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
  }

  // eslint-disable-next-line class-methods-use-this
  private getAxiosInstance() {
    return instance;
  }

  protected async get<T, D = unknown>(
    url: string,
    data?: D,
    token?: string,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().get<T>(url, {
      params: data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  protected async post<T, D>(
    url: string,
    data?: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().post<T>(url, data, {headers});
  }

  protected async put<T, D = unknown>(
    url: string,
    data: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().put<T>(url, data, {headers});
  }

  protected async delete<T, D = unknown>(
    url: string,
    data?: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().delete<T>(url, {headers, data});
  }
}

export default Api;
