import { User } from "@/types";
import * as api from "@/utils/featchUserData";
import { create } from "zustand";

type UserAuth = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: (userData: Pick<User, "email" | "password">) => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (user: Partial<User>) => Promise<void>;
  deleteProfile: () => Promise<void>;
};

export const useAuth = create<UserAuth>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.loginUser({ email, password });

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Login Failed", isLoading: false });
    }
  },
  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.registerUser(userData);

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Registration failed", isLoading: false });
    }
  },
  fetchProfile: async () => {
    set({ isLoading: true, error: null });

    const { user } = get();

    if (!user) {
      set({ error: "No user logged in!", isLoading: false });
      return;
    }

    try {
      const response = await api.getUserProfile();

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Unable to fetch user data", isLoading: false });
    }
  },
  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });

    const { user } = get();
    if (!user) {
      set({ error: "No user logged in", isLoading: false });
      return;
    }

    try {
      const response = await api.updateUser(user.id, userData);
      if (response.data) {
        set({ user: { ...user, ...response.data }, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Updation failed", isLoading: false });
    }
  },
  deleteProfile: async () => {
    set({ isLoading: true, error: null });

    const { user } = get();

    if (!user) {
      set({ error: "No user logged in!", isLoading: false });
      return;
    }

    try {
      const response = await api.deleteUser(user.id);

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Failed to delete account!", isLoading: false });
    }
  },
}));
