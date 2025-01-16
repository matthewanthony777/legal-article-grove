export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  tags: string[];
  coverImage?: string; // Optional cover image path
}

export interface Article extends ArticleMetadata {
  content: string;
}