import * as Sentry from '@sentry/nextjs';
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  HttpStatusCode,
} from 'axios';

import {getCookieValue} from '@/utils/cookie';

export type ApiError = AxiosError<{
  errorCode: string;
  message: string;
}>;

class Api {
  private readonly instance: AxiosInstance;

  readonly baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
    this.instance = axios.create({
      baseURL: this.baseURL,
    });
  }

  private setInterceptor() {
    this.instance.interceptors.request.use(config => {
      if (typeof window !== 'undefined') {
        const token = getCookieValue('access-token');
        if (token) {
          config.headers.setAuthorization(token);
        }
      }
      return config;
    });

    this.instance.interceptors.response.use(
      response => response,
      (error: ApiError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          fetch(`${this.baseURL}/api/reissue/access-token`).catch(() =>
            Promise.reject(error),
          );
        }
        if (error.response) {
          Sentry.captureException(error.response.data);
        } else if (error.request) {
          Sentry.captureException(error.request);
        } else {
          Sentry.captureException(error.message);
        }
        Sentry.captureException(error);
        return Promise.reject(error);
      },
    );
  }

  private getAxiosInstance() {
    this.setInterceptor();
    return this.instance;
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
