import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "@/utils/fetchPaperData";
import type { ApiResponse } from "@/utils/makeRequest";
import { Paper } from "@/types";

function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data as T;
}

export function usePapers() {
  return useQuery("papers", async () =>
    unwrapApiResponse(await api.fetchPapers())
  );
}

export function usePaper(paperId: string) {
  return useQuery(["paper", paperId], async () =>
    unwrapApiResponse(await api.fetchPaperById(paperId))
  );
}

export function useSearchPaper(query: string) {
  return useQuery(
    ["papers", "search", query],
    async () => unwrapApiResponse(await api.searchPapers(query)),
    {
      enabled: !!query,
    }
  );
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: { userId: string; paperId: string }) =>
      unwrapApiResponse(await api.toggleBookmark(data)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookmark");
      },
    }
  );
}

export function useFetchBookmarks(userId?: string) {
  return useQuery(["bookmarks", userId], async () =>
    unwrapApiResponse(await api.fetchBookmarks(userId))
  );
}

export function useUpdatePaper() {
  const queryClient = useQueryClient();

  return useMutation(
    async (paper: Paper) => unwrapApiResponse(await api.updatePaper(paper)),
    {
      onSuccess: (updatedPaper) => {
        queryClient.setQueryData(["paper", updatedPaper.id], updatedPaper);
        queryClient.invalidateQueries("papers");
      },
    }
  );
}

export function useArchivePaper() {
  const queryClient = useQueryClient();

  return useMutation(
    async (paperId: string) =>
      unwrapApiResponse(await api.archivePaper(paperId)),
    {
      onSuccess(_, paperId) {
        queryClient.removeQueries(["paper", paperId]);
        queryClient.invalidateQueries("papers");
      },
    }
  );
}

export function useDeletePaper() {
  const queryClient = useQueryClient();

  return useMutation(
    async (paperId: string) =>
      unwrapApiResponse(await api.deletePaper(paperId)),
    {
      onSuccess: (_, paperId) => {
        queryClient.removeQueries(["paper", paperId]);
        queryClient.invalidateQueries("papers");
      },
    }
  );
}
