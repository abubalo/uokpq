import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "@/utils/fetchPaperData";
import type { ApiResponse } from "@/utils/makeRequest";
import { Paper } from "@/types";

function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (response.error) {
    throw response.error;
  }
  return response.data as T;
}

export function usePapers(page: number, limit: number = 10) {
  return useQuery(
    ["papers", page, limit],
    async () => unwrapApiResponse(await api.fetchPapers(page, limit)),
    {
      enabled: !!page,
      onError: (error) => {
        console.error("Error fetching papers:", error);
        // You could trigger a toast notification or error boundary here
      },
    } // Ensure query only runs when page is valid
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
      onMutate: async (data) => {
        const previousBookmarks = queryClient.getQueryData([
          "bookmarks",
          data.userId,
        ]);
        queryClient.setQueryData(["bookmarks", data.userId], (old: any) => {
          // Update bookmark list optimistically
          return old.includes(data.paperId)
            ? old.filter((id: string) => id !== data.paperId)
            : [...old, data.paperId];
        });
        return { previousBookmarks };
      },
      onError: (err, data, context) => {
        queryClient.setQueryData(
          ["bookmarks", data.userId],
          context?.previousBookmarks
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries("bookmark");
      },
    }
  );
}

export function useFetchBookmarks(userId: string) {
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
