import { api } from './axiosInstance';

interface SignupData {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number
}

interface SignupResponse {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  userId: number;
  message: string;
}

export async function signup(data: SignupData): Promise<SignupResponse> {
  const res = await api.post('/api/v1/users', data);
  return res.data.data;
};

export async function login(data: LoginData): Promise<LoginResponse> {
  const res = await api.post('/api/v1/auth/login', data);
  return res.data.data;
};