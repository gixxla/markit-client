import { client } from "./client";

// 1. 응답(Response) 타입
export interface ApiBookmark {
  id: string;
  title: string;
  url: string;
  tags: { id: string; name: string; colorCode: string }[];
  category?: { id: string; name: string };
  isReadLater: boolean;
  isOfflineAvailable: boolean;
  createdAt: string;
}

export interface GetBookmarksResponse {
  data: ApiBookmark[];
  meta: {
    hasNextPage: boolean;
    nextCursor: string | null;
    limit: number;
  };
}

// 2. 요청(Request) 타입: DTO
export interface CreateBookmarkParams {
  url: string;
  title: string;
  categoryId?: string;
  tags?: string[];
}

export interface UpdateBookmarkParams {
  url?: string;
  title?: string;
  isReadLater?: boolean;
  categoryId?: string;
  tags?: string[];
}

// 3. API 함수들
export const getBookmarks = async (page = 1, limit = 20) => {
  const response = await client.get<GetBookmarksResponse>("/bookmark", {
    params: { page, limit },
  });
  return response.data;
};

export const createBookmark = async (data: CreateBookmarkParams) => {
  const response = await client.post("/bookmark", data);
  return response.data;
};

export const updateBookmark = async (id: string, data: UpdateBookmarkParams) => {
  const response = await client.patch(`/bookmark/${id}`, data);
  return response.data;
};

export const deleteBookmark = async (id: string) => {
  await client.delete(`/bookmark/${id}`);
};

export const updateAccessTime = async (id: string) => {
  await client.patch(`/bookmark/${id}/access`);
};
