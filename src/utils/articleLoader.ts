import { Article, ArticleMetadata } from "@/types/article";

// This is a mock implementation - in a real app you'd load actual MDX files
const MOCK_ARTICLES: Article[] = [
  {
    title: "Understanding Modern Web Development",
    date: "2024-03-15",
    author: "Jane Smith",
    description: "A comprehensive guide to modern web development practices and tools.",
    slug: "understanding-modern-web-development",
    tags: ["Web Development", "JavaScript", "React"],
    content: "This is the full article content that would normally be loaded from an MDX file..."
  },
  {
    title: "The Future of AI in Tech",
    date: "2024-03-14",
    author: "John Doe",
    description: "Exploring how artificial intelligence is shaping the future of technology.",
    slug: "future-of-ai-in-tech",
    tags: ["AI", "Technology", "Future"],
    content: "Another article's content that would be loaded from an MDX file..."
  }
];

export const getAllArticles = (): Article[] => {
  return MOCK_ARTICLES.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return MOCK_ARTICLES.find(article => article.slug === slug);
};

export const getArticlesByTag = (tag: string): Article[] => {
  return MOCK_ARTICLES.filter(article => 
    article.tags.includes(tag)
  ).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};