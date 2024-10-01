import { API_ROOT_URL } from './endpointConfig';

const BASE_URL = `${API_ROOT_URL}/api/v1`

export const CORE_ENDPOINTS = {
    apiHelloWorld: `${BASE_URL}/hello-world`,
    apiHelloWorldPost: `${BASE_URL}/hello-world-post`,
};