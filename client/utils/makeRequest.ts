import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export const makeApiRequest = async <T>(
  axiosFn: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosFn(config);
    return { data: response.data, error: null };
  } catch (error) {
    const apiError = handleApiError(error);
    console.error("API Request Error:", apiError);
    return { data: null, error: apiError };
  }
};

const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      code: error.response?.status?.toString(),
      details: error.response?.data
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  } else {
    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
};