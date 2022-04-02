import { createAxiosService } from '@mpigeon/client-shared';
import {
  LoginRequest,
  LoginResponse,
  MessagesRequest,
  MessagesResponse,
} from './types';

const service = createAxiosService(`${import.meta.env.VITE_HTTP_URL}/admin`);

export class API {
  static async login(body: LoginRequest) {
    return await service.post<LoginResponse>('/login', body);
  }

  static async init() {
    return await service.get('/init');
  }

  static async getMessages(params: MessagesRequest) {
    return await service.get<MessagesResponse>('/messages', { params });
  }
}
