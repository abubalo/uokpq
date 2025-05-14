// types/sanity.ts

export interface SanityImage {
  asset?: {
    _id: string;
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  asset: {
    _id: string;
    url: string;
  };
}

export interface SanityReference {
  _id: string;
  _type: "reference";
  _ref: string;
}

export interface SanityPaper {
  _id: string;
  _type: "paper";
  _createdAt: string;
  moduleTitle: string;
  moduleCode: string;
  pdfFile: {
    asset: {
      _id: string;
      url: string;
    };
  };
  thumbnail?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  dateTaken: string;
  level: number;
  trimester: number;
  department: SanityReference;
  lecturer: SanityReference;
  programme?: Array<SanityReference>;
  paperType: "exam" | "cat";
  session?: "day" | "evening" | "weekend";
  uploadedBy?: SanityReference;
  tags?: string[];
  isArchived: boolean;
}

export interface Paper {
  _id: string;
  _type: "paper";
  _createdAt: string;
  moduleTitle: string;
  moduleCode: string;
  pdfFile: SanityFile
  thumbnail?: SanityFile
  dateTaken: string;
  level: number;
  trimester: number;
  department?: {
    _id: string;
    name: string;
    code?: string;
  };
  lecturer?: {
    _id: string;
    name: string;
    email?: string;
    photo?: SanityImage;
  };
  programme?: Array<{
    _id: string;
    name: string;
    code?: string;
  }>;
  paperType: "exam" | "cat";
  session?: "day" | "evening" | "weekend";
  uploadedBy?: {
    _id: string;
    name: string;
  };
  tags?: string[];
  isArchived: boolean;
}