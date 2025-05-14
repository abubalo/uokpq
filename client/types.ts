// export type ResponseData<T> = {
//   success: boolean;
//   value?: T;
//   errorMessage?: string;
// };

// export type User = {
//   id: string;
//   email: string;
//   password: string;
//   schoolId?: string;
//   firstName: string;
//   lastName: string;
//   profileImage?: string;
//   createAt?: Date | number;
//   updatedAt?: Date | number;
//   isEmailVerified: boolean;
//   resetPasswordToken: string | null;
//   resetPasswordExpires: string | null;
//   emailVerificationToken: string | null;
//   emailVerificationExpires: number | null;
//   role: "regular" | "admin" | "super-admin";
//   lastLogin?: number;
// };

// export type PaperValues = {
//   course: string;
//   module: string;
//   dateTaken: Date;
//   lecturer: string;
//   uploader: string;
//   trimester: string;
//   pdfUrl: File;
//   thumbnail?: File | undefined;
// }

// export type Paper = {
//   id: string;
//   pdfUrl: string;
//   thumbnail: string;
//   year: number;
//   course: string;
//   module: string;
//   trimester: string;
//   lecturer: string;
//   dateTaken: number;
//   upploadedAt: number;
//   updatedAt: number;
//   uploader: string;
//   isArchive: boolean;
//   isBookmarked: boolean;
// };

// export type PapersData = {
//   papers: Paper[];
//   currentPage: number;
//   totalPage: number;
// };

// export interface SearchParams {
//   query?: string;
//   year?: number;
//   moduleId?: number;
//   trimesterId?: number;
//   lecturerName?: string;
//   departmentId?: number;
//   tags?: string[];
//   page?: number;
//   limit?: number;
//   sortBy?: keyof Paper;
//   sortOrder?: "asc" | "desc";
// }

// export type Bookmark = {
//   userId: string;
//   paperId: string;
// };
// export interface Bookmarks {
//   bookmarkId: number;
//   userId: string;
//   paperId: number;
//   bookmarkedAt: Date;
//   paperTitle: string;
//   filePath: string;
//   year: number;
//   moduleId: number;
//   trimesterId: number;
//   lecturerName: string;
//   uploadedAt: Date;
//   updatedAt: Date;
//   uploaderId: number;
//   isArchive: boolean;
// }
