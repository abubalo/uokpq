import { Paper } from "@/types";
import { apiClient } from "./apiClient";
import { makeApiRequest } from "./makeRequest";

export function addPaper() {
  return makeApiRequest<Paper>(() => apiClient.post("/paper"));
}

export function fetchPapers() {
  return makeApiRequest<Paper[]>(() => apiClient.get("/papers"));
}

export function fetchPaperById(paperId: string) {
  return makeApiRequest<Paper>(() => apiClient.get(`/papers/${paperId}`));
}

export function fetchPaperByUserId(userId: string) {
  return makeApiRequest<Paper[]>(() => apiClient.get(`/papers/${userId}`));
}

export function searchPapers(queries: string) {
  return makeApiRequest<Paper[]>(() =>
    apiClient.get(`/papers/?query=${queries}`)
  );
}

export function toggleBookmark(data: { userId: string; paperId: string }) {
  return makeApiRequest<void>(() => apiClient.post("/papers/bookmark", data));
}

export function fetchBookmarks(userId?: string) {
  return makeApiRequest<Paper[]>(() =>
    apiClient.get(`/papers/bookmarks/${userId}`)
  );
}

export function updatePaper(paper: Partial<Paper>) {
  return makeApiRequest<Paper>(() => apiClient.put(`/papers`, paper));
}
export function archivePaper(paperId: string) {
  return makeApiRequest<void>(() => apiClient.put(`/papers/achive/${paperId}`));
}
export function deletePaper(paperId: string) {
  return makeApiRequest<void>(() => apiClient.delete(`/${paperId}`));
}
