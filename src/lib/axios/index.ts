import axios from 'axios';
import type {AxiosInstance, AxiosRequestConfig} from 'axios';

class Api {
  private readonly axiosInstance: AxiosInstance;
  private readonly token: string | undefined;
  readonly baseURL: string;
  constructor(token?: string) {
    this.token = token;
    this.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  private getAxiosInstance() {
    const api = this.axiosInstance;
    const hasAuthorizationHeader = !!api.defaults.headers.common.Authorization;
    const hasToken = !!this.token;
    if (!hasAuthorizationHeader && hasToken) {
      api.interceptors.request.use(config => {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${this.token}`;
        return config;
      });
    }
    return api;
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
    data: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().post<T>(url, data, {headers});
  }

  protected async put<T, D>(
    url: string,
    data: D,
    headers: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().put<T>(url, data, {headers});
  }

  protected async patch<T, D>(
    url: string,
    data: D,
    headers: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().patch<T>(url, data, {headers});
  }

  protected async delete<T, D>(
    url: string,
    data: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().delete<T>(url, {headers, data});
  }

  protected async head<T, D>(
    url: string,
    data: D,
    headers?: AxiosRequestConfig['headers'],
  ) {
    return this.getAxiosInstance().head<T>(url, {headers, data});
  }
}

export default Api;
