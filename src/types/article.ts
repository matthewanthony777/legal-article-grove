export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  tags: string[];
}

export interface Article extends ArticleMetadata {
  content: string;
}