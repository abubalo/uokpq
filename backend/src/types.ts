export type ResponseData<T> = {
  success: boolean;
  value?: T;
  errorMessage?: string;
};

export type User = {
  id: string | number;
  email: string;
  password: string;
  schoolId?: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  createAt?: Date | number;
  updatedAt?: Date | number;
  isEmailVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
  emailVerificationToken: string | null;
  emailVerificationExpires: number | null;
  role: 'regular' | 'admin' | 'super-admin';
  lastLogin?: number;
};

export type Paper = {
  id: string | number;
  title: string;
  filePath: string;
  year: number;
  courseId: string;
  moduleId: string;
  trimesterId: string;
  lecturerName: string;
  upploadedAt: number;
  updatedAt: number;
  uploaderId: string;
  isArchive: boolean;
  tags: string[];
};

export interface SearchParams {
  query?: string;
  year?: number;
  moduleId?: number;
  trimesterId?: number;
  lecturerName?: string;
  departmentId?: number;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: keyof Paper;
  sortOrder?: 'asc' | 'desc';
}

export type Bookmark = {
  userId: string;
  paperId: string;
};
export interface Bookmarks {
  bookmarkId: number;
  userId: string;
  paperId: number;
  bookmarkedAt: Date;
  paperTitle: string;
  filePath: string;
  year: number;
  moduleId: number;
  trimesterId: number;
  lecturerName: string;
  uploadedAt: Date;
  updatedAt: Date;
  uploaderId: number;
  isArchive: boolean;
}
export type Role = {
  userId: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
      user?: User;
      apiVersion?: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      JWT_SECRET: string;
      SERVER_PORT: string;
      SESSION_MAX_AGE: string;
      DB_USERNAME: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      REDIS_UPSTACH_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      REDIS_DB: string;
      REDIS_CACHE_TTL: string;
      REGION: string;
      ACCESS_KEY_ID: string;
      SECRET_ACCESS_KEY: string;
      BUCKET_NAME: string;
      ENDPOINT: string;
    }
  }
}
