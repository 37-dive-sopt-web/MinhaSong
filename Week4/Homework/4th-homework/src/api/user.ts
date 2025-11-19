import { api } from './axiosInstance';

interface GetUserResponse {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

interface EditUserInfoData {
  name: string;
  email: string;
  age: number;
};

interface EditUserResponse {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export async function getUser(id: number): Promise<GetUserResponse> {
  const res = await api.get(`/api/v1/users/${id}`);
  return res.data.data;
};

export async function editUser(id: number, data: EditUserInfoData): Promise<EditUserResponse> {
  const res = await api.patch(`/api/v1/users/${id}`, data);
  return res.data.data;
};

export function deleteUser(id: number) {
  return api.delete(`/api/v1/users/${id}`);
};