import { User } from "@/types";
import * as api from "@/utils/fetchUserData";
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
      const { data, error } = await api.loginUser({ email, password });

      if (data) {
        set({ user: data, isLoading: false });
      } else {
        set({ error: error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Login Failed", isLoading: false });
    }
  },
  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const { data, error } = await api.registerUser(userData);

      if (data) {
        set({ user: data, isLoading: false });
      } else {
        set({ error: error, isLoading: false });
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
      const { data, error } = await api.getUserProfile();

      if (data) {
        set({ user: data, isLoading: false });
      } else {
        set({ error: error, isLoading: false });
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
      const { data, error } = await api.updateUser(user.id, userData);
      if (data) {
        set({ user: { ...user, ...data }, isLoading: false });
      } else {
        set({ error: error, isLoading: false });
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
      const { data, error } = await api.deleteUser(user.id);

      if (data) {
        set({ user: data, isLoading: false });
      } else {
        set({ error: error, isLoading: false });
      }
    } catch (error) {
      set({ error: "Failed to delete account!", isLoading: false });
    }
  },
}));
