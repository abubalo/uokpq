import { User } from "@/types";
import { makeApiRequest } from "./makeRequest";
import { apiClient } from "./apiClient";

export function registerUser(data: Pick<User, "email" | "password">) {
  return makeApiRequest<User>(() => apiClient.post("/users/register", data));
}

export function loginUser(data: Pick<User, 'email' | 'password'>) {
  return makeApiRequest<User>(() => apiClient.post("/users/login", data));
}

export function getUserProfile() {
  return makeApiRequest<User>(() => apiClient.get("/users"));
}

export function updateUser(userId: string, user: Partial<User>) {
  return makeApiRequest<User>(() => apiClient.put(`/users/${userId}`, user));
}

export function deleteUser(userId: string) {
  return makeApiRequest<void>(() => apiClient.delete(`/users/${userId}`));
}