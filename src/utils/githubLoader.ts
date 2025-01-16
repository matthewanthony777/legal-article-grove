import { ArticleMetadata } from "@/types/article";

const GITHUB_RAW_CONTENT_URL = "https://raw.githubusercontent.com";
const REPO_OWNER = "your-username"; // Replace with your GitHub username
const REPO_NAME = "your-repo"; // Replace with your repository name
const BRANCH = "main"; // Replace with your branch name
const CONTENT_PATH = "content/articles"; // Path to your MDX files in the repo

export async function fetchMDXFromGitHub(fileName: string): Promise<string> {
  const url = `${GITHUB_RAW_CONTENT_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PATH}/${fileName}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch MDX content: ${response.statusText}`);
  }
  
  return response.text();
}

export async function fetchAllMDXFiles(): Promise<Array<{ name: string; content: string }>> {
  // This is a simplified example. In a real application, you'd want to:
  // 1. Use GitHub's API to list all files in the directory
  // 2. Filter for .mdx files
  // 3. Fetch each file's content
  
  const mdxFiles = [
    "sample-article.mdx",
    // Add more article filenames here
  ];
  
  const articles = await Promise.all(
    mdxFiles.map(async (fileName) => ({
      name: fileName,
      content: await fetchMDXFromGitHub(fileName),
    }))
  );
  
  return articles;
}