import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const service = axios.create({ baseURL: '/teacher' });

const handleError = (error: AxiosError) => {
  const { response } = error;
  if (response) {
    toast.error(`${response?.status}: ${response?.data.message}`);
  } else {
    toast.error('Server Error');
  }
  return Promise.reject(error);
};

service.interceptors.response.use(undefined, handleError);

export default service;
