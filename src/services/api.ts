import service from './lib/service';

export type LoginRequestBody = { username: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequestBody = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

export type InitResponse = { username: string; name: string };

export class API {
  static async login(body: LoginRequestBody) {
    return await service.post<LoginResponse>('/login', body);
  }

  static async register(body: RegisterRequestBody) {
    return await service.post('/register', body);
  }

  static async init() {
    return await service.get<InitResponse>('/init');
  }
}
