import { useQuery, useQueryClient, useMutation } from "react-query";
import { 
  getPapers, 
  getPaperByModuleCode, 
  searchPapers,
  // createPaper,
  // updatePaper,
  // archivePaper
} from "@/utils/sanity/paper";
import type { Paper, SanityPaper } from "@/types/sanity";
// import { QueryKeys } from "@/constants/queryKeys";

// // Constants for query keys
export const QueryKeys = {
  PAPERS: 'papers',
  PAPER: 'paper',
  SEARCH_PAPERS: 'search-papers'
} as const;

interface UsePapersOptions {
  page?: number;
  limit?: number;
  filters?: {
    department?: string;
    programme?: string;
    level?: number;
    trimester?: number;
    paperType?: 'exam' | 'cat';
    isArchived?: boolean;
  };
}

interface UsePaperByCodeOptions {
  enabled?: boolean;
}

interface UseSearchPapersOptions {
  query: string;
  limit?: number;
  filters?: {
    department?: string;
    programme?: string;
    level?: number;
    paperType?: 'exam' | 'cat';
  };
  enabled?: boolean;
}

export function usePapers({
  page = 1,
  limit = 10,
  filters = {}
}: UsePapersOptions = {}) {
  return useQuery(
    [QueryKeys.PAPERS, page, limit, filters],
    () => getPapers({
      page,
      limit,
      filters
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 15 * 60 * 1000, // 15 minutes
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        console.error("Error fetching papers:", error);
        // TODO: Add error reporting (Sentry, etc.)
      },
      select: (data) => ({
        papers: data.papers,
        total: data.total,
        totalPages: Math.ceil(data.total / limit),
        currentPage: page
      })
    }
  );
}

export function usePaperByModuleCode(moduleCode: string, options?: UsePaperByCodeOptions) {
  return useQuery(
    [QueryKeys.PAPER, moduleCode],
    () => getPaperByModuleCode(moduleCode),
    {
      enabled: options?.enabled ?? true,
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      onError: (error: Error) => {
        console.error(`Error fetching paper ${moduleCode}:`, error);
      }
    }
  );
}

export function useSearchPapers({
  query,
  limit = 10,
  filters = {},
  enabled = true
}: UseSearchPapersOptions) {
  return useQuery(
    [QueryKeys.SEARCH_PAPERS, query, limit, filters],
    () => searchPapers({
      query,
      limit,
      filters
    }),
    {
      enabled: enabled && query.length > 0, // Only run when query is not empty
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
      onError: (error: Error) => {
        console.error("Error searching papers:", error);
      }
    }
  );
}

// export function useCreatePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (newPaper: Omit<SanityPaper, '_id' | '_type' | '_createdAt'>) => createPaper(newPaper),
//     {
//       onSuccess: () => {
//         // Invalidate all paper-related queries
//         queryClient.invalidateQueries(QueryKeys.PAPERS);
//         queryClient.invalidateQueries(QueryKeys.SEARCH_PAPERS);
//       },
//       onError: (error: Error) => {
//         console.error("Error creating paper:", error);
//       }
//     }
//   );
// }

// export function useUpdatePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ id, updates }: { id: string; updates: Partial<SanityPaper> }) => updatePaper(id, updates),
//     {
//       onSuccess: (_, variables) => {
//         // Invalidate specific paper and all papers list
//         queryClient.invalidateQueries([QueryKeys.PAPER, variables.id]);
//         queryClient.invalidateQueries(QueryKeys.PAPERS);
//         queryClient.invalidateQueries(QueryKeys.SEARCH_PAPERS);
//       },
//       onError: (error: Error) => {
//         console.error("Error updating paper:", error);
//       }
//     }
//   );
// }

// export function useArchivePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (id: string) => archivePaper(id),
//     {
//       onSuccess: (_, id) => {
//         // Optimistically update the paper in cache
//         queryClient.setQueryData([QueryKeys.PAPER, id], (old: Paper | undefined) => 
//           old ? { ...old, isArchived: true } : undefined
//         );
        
//         // Invalidate lists
//         queryClient.invalidateQueries(QueryKeys.PAPERS);
//         queryClient.invalidateQueries(QueryKeys.SEARCH_PAPERS);
//       },
//       onError: (error: Error) => {
//         console.error("Error archiving paper:", error);
//       }
//     }
//   );
// }





// export const prefetchPage = (newPage: number) => {
//   const queryClient = useQueryClient();
//   queryClient.prefetchQuery(
//     ['papers', newPage, limit, query, moduleCode],
//     () => getPapers({ page: newPage, limit, query, moduleCode })
//   );
// };

// export function usePaper(paperId: string) {
//   return useQuery(["paper", paperId], async () =>
//     unwrapApiResponse(await api.fetchPaperById(paperId))
//   );
// }

// export function useAddPaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (newPaper: PaperValues) => unwrapApiResponse(await api.addPaper(newPaper)), // Assuming `api.addPaper` exists in your utils
//     {
//       onSuccess: (addedPaper) => {
//         // Update the cache with the newly added paper
//         queryClient.invalidateQueries("papers"); // Invalidate 'papers' query to refetch and include the new paper
//       },
//     }
//   );
// }


// export function useSearchPaper(query: string) {
//   return useQuery(
//     ["papers", "search", query],
//     async () => unwrapApiResponse(await api.searchPapers(query)),
//     {
//       enabled: !!query,
//     }
//   );
// }

// export function useToggleBookmark() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async (data: { userId: string; paperId: string }) =>
//       unwrapApiResponse(await api.toggleBookmark(data)),
//     {
//       onMutate: async (data) => {
//         const previousBookmarks = queryClient.getQueryData([
//           "bookmarks",
//           data.userId,
//         ]);
//         queryClient.setQueryData(["bookmarks", data.userId], (old: any) => {
//           // Update bookmark list optimistically
//           return old.includes(data.paperId)
//             ? old.filter((id: string) => id !== data.paperId)
//             : [...old, data.paperId];
//         });
//         return { previousBookmarks };
//       },
//       onError: (err, data, context) => {
//         queryClient.setQueryData(
//           ["bookmarks", data.userId],
//           context?.previousBookmarks
//         );
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries("bookmark");
//       },
//     }
//   );
// }

// export function useFetchBookmarks(userId: string) {
//   return useQuery(["bookmarks", userId], async () =>
//     unwrapApiResponse(await api.fetchBookmarks(userId))
//   );
// }

// export function useUpdatePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (paper: Paper) => unwrapApiResponse(await api.updatePaper(paper)),
//     {
//       onSuccess: (updatedPaper) => {
//         queryClient.setQueryData(["paper", updatedPaper.id], updatedPaper);
//         queryClient.invalidateQueries("papers");
//       },
//     }
//   );
// }

// export function useArchivePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (paperId: string) =>
//       unwrapApiResponse(await api.archivePaper(paperId)),
//     {
//       onSuccess(_, paperId) {
//         queryClient.removeQueries(["paper", paperId]);
//         queryClient.invalidateQueries("papers");
//       },
//     }
//   );
// }

// export function useDeletePaper() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (paperId: string) =>
//       unwrapApiResponse(await api.deletePaper(paperId)),
//     {
//       onSuccess: (_, paperId) => {
//         queryClient.removeQueries(["paper", paperId]);
//         queryClient.invalidateQueries("papers");
//       },
//     }
//   );
// }
