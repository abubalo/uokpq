import { User } from "@/types";
import * as api from "@/utils/fetchUserData";
import { ApiError } from "@/utils/makeRequest";
import { create } from "zustand";

type UserAuth = {
  user: User | null;
  isLoading: boolean;
  error: ApiError | null;
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
  clearError: () => void;
};

const createApiError = (message: string): ApiError => ({
  message,
  code: "CUSTOM_ERROR",
});

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
        set({
          error: response.error,
          isLoading: false,
        });
        throw response.error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      set({ user: null, error: apiError, isLoading: false });
      throw apiError;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.registerUser(userData);

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({
          user: null,
          error: response.error,
          isLoading: false,
        });
        throw response.error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      set({
        user: null,
        error: apiError,
        isLoading: false,
      });
      throw apiError.message;
    }
  },

  fetchProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.getUserProfile();

      if (response.data) {
        set({ user: response.data, isLoading: false });
      } else {
        set({
          error: response.error,
          isLoading: false,
        });
        throw response.error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      set({
        user: null,
        error: apiError,
        isLoading: false,
      });
      throw apiError.message;
    }
  },

  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });

    const { user } = get();
    if (!user) {
      set({ error: createApiError("User is not logged in"), isLoading: false });
      return;
    }

    try {
      const response = await api.updateUser(user.id, userData);

      if (response.data) {
        set({ user: { ...user, ...response.data }, isLoading: false });
      } else {
        set({
          error: response.error,
          isLoading: false,
        });
        throw response.error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      set({
        user: null,
        error: apiError,
        isLoading: false,
      });
      throw apiError.message;
    }
  },

  deleteProfile: async () => {
    set({ isLoading: true, error: null });

    const { user } = get();

    if (!user) {
      set({
        user: null,
        error: createApiError("User is not logged in"),
        isLoading: false,
      });
      return;
    }

    try {
      const response = await api.deleteUser(user.id);

      if (response.data) {
        set({ user: null, isLoading: false });
      } else {
        set({ user: null, error: response.error, isLoading: false });
        throw response.error;
      }
    } catch (error) {
      const apiError = error as ApiError;
      set({
        user: null,
        error: apiError,
        isLoading: false,
      });
      throw apiError.message;
    }
  },

  clearError: () => set({ error: null }),
}));
