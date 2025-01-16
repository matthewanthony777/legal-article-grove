const GITHUB_RAW_CONTENT_URL = "https://raw.githubusercontent.com";
const REPO_OWNER = "lovable-tech"; // Updated to actual repo
const REPO_NAME = "mdx-demo"; // Updated to actual repo
const BRANCH = "main";
const CONTENT_PATH = "content/articles";

export async function fetchMDXFromGitHub(fileName: string): Promise<string> {
  const url = `${GITHUB_RAW_CONTENT_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PATH}/${fileName}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch MDX content: ${response.statusText}`);
  }
  
  return response.text();
}

export async function fetchAllMDXFiles(): Promise<Array<{ name: string; content: string }>> {
  // For demonstration, we'll use the sample article that exists in the repository
  const mdxFiles = [
    "sample-article.mdx"
  ];
  
  const articles = await Promise.all(
    mdxFiles.map(async (fileName) => ({
      name: fileName,
      content: await fetchMDXFromGitHub(fileName),
    }))
  );
  
  return articles;
}