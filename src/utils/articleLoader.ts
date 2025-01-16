import { Article, ArticleMetadata } from "@/types/article";
import type { MDXModule } from "@/types/mdx";
import { fetchAllMDXFiles } from "./githubLoader";
import * as runtime from 'react/jsx-runtime';
import { compile } from '@mdx-js/mdx';
import { evaluate } from '@mdx-js/mdx';

let ARTICLES: Article[] = [];

async function processMDXContent(content: string): Promise<Article> {
  // Compile MDX to JavaScript
  const compiled = await compile(content, {
    outputFormat: 'function-body',
    development: false
  });

  // Evaluate the compiled code
  const { default: Content, frontmatter } = await evaluate(compiled, {
    ...runtime as any // Type assertion to fix spread error
  });

  return {
    ...frontmatter as ArticleMetadata, // Ensure correct type spreading
    content: Content
  };
}

export const initializeArticles = async () => {
  try {
    const mdxFiles = await fetchAllMDXFiles();
    const processedArticles = await Promise.all(
      mdxFiles.map(async ({ content }) => {
        return processMDXContent(content);
      })
    );
    
    ARTICLES = processedArticles;
  } catch (error) {
    console.error("Failed to initialize articles:", error);
    ARTICLES = [];
  }
};

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
    article.tags?.includes(tag)
  ).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};