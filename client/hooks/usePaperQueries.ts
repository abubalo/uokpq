import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "@/utils/fetchPaperData";

export function usePapers() {
  return useQuery("papers", () => api.fetchPapers());
}

export function usePaper(paperId: string) {
  return useQuery(["paper", paperId], () => api.fetchPaperById(paperId));
}

export function useSearchPaper(query: string) {
  return useQuery(["papers", "search", query], () => api.searchPapers(query), {
    enabled: !!query,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  return useMutation(api.toggleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookmark");
    },
  });
}

export function useFetchBookmarks(userId?: string) {
  return useQuery(["bookmarks", userId], () => api.fetchBookmarks(userId));
}

export function useUpdatePaper() {
  const queryClient = useQueryClient();

  return useMutation(api.updatePaper, {
    onSuccess: (updatedPaper) => {
      queryClient.setQueriesData(["papers", updatedPaper.id], updatedPaper);
      queryClient.invalidateQueries("papers");
    },
  });
}

export function useArchivePaper() {
  const queryClient = useQueryClient();

  return useMutation(api.archivePaper, {
    onSuccess(_, paperId) {
      queryClient.removeQueries(["paper", paperId]);
      queryClient.invalidateQueries("papers");
    },
  });
}

export function useDeletePaper() {
  const queryClient = useQueryClient();

  return useMutation(api.deletePaper, {
    onSuccess: (_, paperId) => {
      queryClient.removeQueries(["paper", paperId]);
      queryClient.invalidateQueries("papers");
    },
  });
}
