export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  tags: string[];
  coverImage?: string;
}

export interface Article extends ArticleMetadata {
  content: React.ComponentType;
}