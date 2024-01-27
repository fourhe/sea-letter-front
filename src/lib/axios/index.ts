import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  HttpStatusCode,
} from 'axios';

export type ApiError = AxiosError;

class Api {
  private readonly axiosInstance: AxiosInstance;

  private readonly token: string | undefined;

  readonly baseURL: string;

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
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
        config.headers.Authorization = this.token;
        return config;
      });
    }

    api.interceptors.response.use(
      response => response,
      (error: ApiError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          fetch('api/reissue/access-token').catch(() => Promise.reject(error));
        }
        return Promise.reject(error);
      },
    );
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
