const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "shadcn";
const REPO_NAME = "ui";
const BRANCH = "main";
const CONTENT_PATH = "apps/www/content/docs";  // Updated path that exists in shadcn/ui repo

export async function fetchMDXFromGitHub(fileName: string): Promise<string> {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}/${fileName}?ref=${BRANCH}`;
  
  try {
    console.log(`Attempting to fetch ${fileName} from GitHub at URL: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
      console.warn('Response body:', await response.text());
      console.warn('Using fallback content');
      return getSampleArticle();
    }
    
    const data = await response.json();
    // GitHub API returns content as base64
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.warn(`Error fetching ${fileName}:`, error);
    console.warn('Using fallback content');
    return getSampleArticle();
  }
}

export async function fetchAllMDXFiles(): Promise<Array<{ name: string; content: string }>> {
  try {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}?ref=${BRANCH}`;
    console.log('Attempting to fetch all MDX files from URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Failed to fetch files from GitHub: ${response.status} ${response.statusText}`);
      console.warn('Response body:', await response.text());
      console.warn('Using fallback content');
      return [{
        name: "sample-article.mdx",
        content: getSampleArticle()
      }];
    }
    
    const files = await response.json();
    
    // Filter for .mdx files only
    const mdxFiles = files.filter((file: { name: string }) => file.name.endsWith('.mdx'));
    
    if (mdxFiles.length === 0) {
      console.warn('No MDX files found, using fallback content');
      return [{
        name: "sample-article.mdx",
        content: getSampleArticle()
      }];
    }

    return Promise.all(
      mdxFiles.map(async (file: { name: string }) => ({
        name: file.name,
        content: await fetchMDXFromGitHub(file.name)
      }))
    );
  } catch (error) {
    console.warn('Error fetching files from GitHub, using fallback content:', error);
    return [{
      name: "sample-article.mdx",
      content: getSampleArticle()
    }];
  }
}

// Keep sample article as fallback content
function getSampleArticle(): string {
  return `---
title: "Understanding Legal Technology Trends in 2024"
date: "2024-01-16"
author: "Jane Smith"
description: "An overview of emerging legal technology trends and their impact on modern law practice"
slug: "legal-tech-trends-2024"
tags: ["Legal Tech", "Innovation", "Digital Transformation"]
coverImage: "/placeholder.svg"
---

# Understanding Legal Technology Trends in 2024

The legal industry is experiencing unprecedented technological transformation. This article explores key trends shaping the future of legal practice.

## Artificial Intelligence in Legal Practice

AI is revolutionizing how legal professionals work, from document review to case prediction. Here's what you need to know:

- **Document Analysis**: AI-powered tools can review contracts faster than ever
- **Predictive Analytics**: Machine learning helps predict case outcomes
- **Legal Research**: Natural language processing makes research more efficient

## Digital Court Proceedings

The pandemic has accelerated the adoption of virtual court proceedings:

1. Video conferencing for hearings
2. Digital evidence submission
3. Remote depositions

## Blockchain and Smart Contracts

Smart contracts are changing how we think about legal agreements:

\`\`\`javascript
// Example of a smart contract structure
contract LegalAgreement {
    address public party1;
    address public party2;
    uint public agreementDate;
}
\`\`\`

## Looking Ahead

The future of legal technology promises even more innovation. Stay tuned for updates on:

- Automated compliance systems
- Blockchain-based legal documents
- AI-powered legal assistants

> "The practice of law is changing, and technology is leading the way." - Legal Tech Expert

For more information, visit our [resources page](#).`;
}