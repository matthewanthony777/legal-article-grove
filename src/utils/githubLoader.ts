const GITHUB_RAW_CONTENT_URL = "https://raw.githubusercontent.com";
const REPO_OWNER = "lovable-tech";
const REPO_NAME = "mdx-demo";
const BRANCH = "main";
const CONTENT_PATH = "content/articles";

export async function fetchMDXFromGitHub(fileName: string): Promise<string> {
  const url = `${GITHUB_RAW_CONTENT_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PATH}/${fileName}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
      // Fallback to sample content if GitHub fetch fails
      return getSampleArticle();
    }
    
    return response.text();
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    // Fallback to sample content if fetch fails
    return getSampleArticle();
  }
}

export async function fetchAllMDXFiles(): Promise<Array<{ name: string; content: string }>> {
  try {
    // First try to fetch the list of files from GitHub
    const url = `${GITHUB_RAW_CONTENT_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PATH}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn('Failed to fetch files from GitHub, using fallback content');
      return [{
        name: "sample-article.mdx",
        content: getSampleArticle()
      }];
    }
    
    const files = await response.json();
    return Promise.all(
      files.map(async (file: { name: string }) => ({
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
