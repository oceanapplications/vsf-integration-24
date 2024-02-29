import axios from 'axios';
import { apiClientFactory } from '@vue-storefront/middleware';
import { MiddlewareConfig } from './index';
import * as apiEndpoints from './api';

/**
 * In here you should create the client you'll use to communicate with the backend.
 * Axios is just an example.
 */
const buildClient = () => {
  const axiosInstance = axios.create();
  return axiosInstance
}

const onCreate = (settings: MiddlewareConfig) => {
  const client = axios.create({
    baseURL: settings.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + settings.apiKey
    }
  });

  return {
    config: settings,
    client
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: apiEndpoints,
});

export { createApiClient };
