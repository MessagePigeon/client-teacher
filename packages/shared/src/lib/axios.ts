import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function createAxiosService(url: string) {
  const service = axios.create({
    baseURL: url,
  });
  service.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  service.interceptors.response.use(undefined, (error: AxiosError) => {
    const { response } = error;
    toast.error(
      response
        ? `${response?.status}: ${response?.data.message}`
        : 'Server Error',
    );
    return Promise.reject(error);
  });
  return service;
}
