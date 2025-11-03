import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import CONFIG from '~/config/app';

export class Http {
  private instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig, setup?: (ins: AxiosInstance) => void) {
    this.instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
      timeout: CONFIG.AXIOS_TIMEOUT,
      ...config,
    });
    setup?.(this.instance);
  }

  async get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.get<T>(url, { params, ...config });
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

const http = new Http();

export default http;
