import api from "./axios";
import type { User } from "../features/users/types.ts";

export const fetchUsers = async (page = 1, limit = 10) => {
  const res = await api.get<User[]>("/users", {
    params: { page, limit },
  });
  return { data: res.data, headers: res.headers };
};

export const fetchUser = async (id: string) => {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
};

export const createUser = async (user: Partial<User>) => {
  const res = await api.post<User>("/users", user);
  return res.data;
};

export const updateUser = async (id: string, user: Partial<User>) => {
  const res = await api.put<User>(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
