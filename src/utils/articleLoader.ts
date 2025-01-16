import { Article, ArticleMetadata } from "@/types/article";
import type { MDXModule } from "@/types/mdx";

// Import the sample article
import sampleArticle from "../../content/articles/sample-article.mdx";

const ARTICLES: Article[] = [
  {
    ...(sampleArticle as unknown as MDXModule).frontmatter,
    content: (sampleArticle as unknown as MDXModule).default
  }
];

export const getAllArticles = (): Article[] => {
  return ARTICLES.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return ARTICLES.find(article => article.slug === slug);
};

export const getArticlesByTag = (tag: string): Article[] => {
  return ARTICLES.filter(article => 
    article.tags.includes(tag)
  ).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};