import { sanityClient } from "@/lib/sanity";
import { Paper } from "@/types/sanity";

interface PaginatedResult<T> {
  papers: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface GetPapersOptions {
  page?: number;
  limit?: number;
  filters?: {
    department?: string;
    programme?: string;
    level?: number;
    trimester?: number;
    paperType?: "exam" | "cat";
    isArchived?: boolean;
  };
}

export async function getPapers(
  options: GetPapersOptions = {}
): Promise<PaginatedResult<Paper>> {
  const { page = 1, limit = 10, filters = {} } = options;

  const start = (page - 1) * limit;
  const end = start + limit;

  // Base query
  let query = `*[_type == "paper"`;

  // Apply filters
  const filterConditions: string[] = [];

  if (filters.department) {
    filterConditions.push(`department._ref == "${filters.department}"`);
  }

  if (filters.programme) {
    filterConditions.push(`programme[]._ref match "${filters.programme}"`);
  }

  if (filters.level !== undefined) {
    filterConditions.push(`level == ${filters.level}`);
  }

  if (filters.trimester !== undefined) {
    filterConditions.push(`trimester == ${filters.trimester}`);
  }

  if (filters.paperType) {
    filterConditions.push(`paperType == "${filters.paperType}"`);
  }

  if (filters.isArchived !== undefined) {
    filterConditions.push(`isArchived == ${filters.isArchived}`);
  }

  if (filterConditions.length > 0) {
    query += ` && ${filterConditions.join(" && ")}`;
  }

  query += `] | order(dateTaken desc) {
    _id,
    _type,
    _createdAt,
    moduleTitle,
    moduleCode,
    pdfFile {
      asset-> {
        _id,
        url
      }
    },
    thumbnail {
      asset-> {
        _id,
        url
      }
    },
    dateTaken,
    department->{_id, name, code},
    programme[]->{_id, name, code},
    level,
    trimester,
    lecturer->{_id, name, email, photo},
    paperType,
    session,
    uploadedBy->{_id, name},
    tags,
    isArchived
  }`;

  // Get total count
  const countQuery = `count(*[_type == "paper"${filterConditions.length > 0 ? ` && ${filterConditions.join(" && ")}` : ''}])`;
  const total = await sanityClient.fetch<number>(countQuery);

  // Get paginated results
  const papers = await sanityClient.fetch<Paper[]>(
    `${query}[${start}...${end}]`
  );

  return {
    papers,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPaperByModuleCode(
  moduleCode: string
): Promise<Paper | null> {
  const query = `*[_type == "paper" && moduleCode == $moduleCode][0] {
    _id,
    _type,
    _createdAt,
    moduleTitle,
    moduleCode,
    pdfFile {
      asset-> {
        _id,
        url
      }
    },
    thumbnail {
      asset-> {
        _id,
        url
      }
    },
    dateTaken,
    department->{_id, name, code},
    programme[]->{_id, name, code},
    level,
    trimester,
    lecturer->{_id, name, email, photo},
    paperType,
    session,
    uploadedBy->{_id, name},
    tags,
    isArchived
  }`;

  const paper = await sanityClient.fetch<Paper | null>(query, {
    moduleCode,
  });
  return paper;
}

interface SearchPapersOptions {
  query: string;
  limit?: number;
  filters?: {
    department?: string;
    programme?: string;
    level?: number;
    paperType?: "exam" | "cat";
  };
}

export async function searchPapers(options: SearchPapersOptions): Promise<Paper[]> {
  const { query, limit = 10, filters = {} } = options;

  let groqQuery = `*[_type == "paper" && (
    moduleTitle match $searchQuery || 
    moduleCode match $searchQuery || 
    defined(tags[][@ match $searchQuery])
  )`;

  // Apply filters
  const filterConditions: string[] = [];

  if (filters.department) {
    filterConditions.push(`department._ref == $department`);
  }

  if (filters.programme) {
    filterConditions.push(`programme[]._ref match $programme`);
  }

  if (filters.level !== undefined) {
    filterConditions.push(`level == $level`);
  }

  if (filters.paperType) {
    filterConditions.push(`paperType == $paperType`);
  }

  if (filterConditions.length > 0) {
    groqQuery += ` && ${filterConditions.join(' && ')}`;
  }

  groqQuery += `][0...$limit] {
    _id,
    _type,
    _createdAt,
    moduleTitle,
    moduleCode,
    pdfFile {
      asset-> {
        _id,
        url
      }
    },
    thumbnail {
      asset-> {
        _id,
        url
      }
    },
    dateTaken,
    department->{_id, name, code},
    programme[]->{_id, name, code},
    level,
    trimester,
    lecturer->{_id, name, email, photo},
    paperType,
    session,
    uploadedBy->{_id, name},
    tags,
    isArchived
  }`;

  // Prepare query parameters with explicit type
  const params: Record<string, unknown> = {
    searchQuery: `*${query}*`, // The parameter used in the GROQ query
    limit
  };

  // Add filter parameters if they exist
  if (filters.department) params.department = filters.department;
  if (filters.programme) params.programme = filters.programme;
  if (filters.level !== undefined) params.level = filters.level;
  if (filters.paperType) params.paperType = filters.paperType;

  const papers = await sanityClient.fetch<Paper[]>(groqQuery, params);
  return papers;
}