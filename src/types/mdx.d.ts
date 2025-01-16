import { ArticleMetadata } from "./article";
import { ComponentType } from "react";

export interface MDXModule {
  default: ComponentType;
  frontmatter: ArticleMetadata;
}

declare module "*.mdx" {
  const MDXComponent: MDXModule;
  export default MDXComponent;
}