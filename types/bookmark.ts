export interface Bookmark {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  tagIds: string[];
  category?: string;
}
