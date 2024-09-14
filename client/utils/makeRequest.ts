import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error?: string | null;
}

export const makeApiRequest = async <T>(
    axiosFn: (config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosFn(config);
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = error instanceof AxiosError 
        ? handleApiError(error) 
        : 'An unexpected error occurred';
      console.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  };
  

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    return `HTTP Error - Status Code: ${error.response.status}`;
  } else if (error.request) {
    return "No response received from the server.";
  } else {
    return "An error occurred while setting up the request.";
  }
};
