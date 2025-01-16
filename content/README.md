# Content Guidelines for Legal Blog

## MDX Article Template

Create new articles in the `articles` folder using the following template:

```mdx
---
title: "Your Article Title"
date: "YYYY-MM-DD"
author: "Author Name"
description: "A brief description of your article (1-2 sentences)"
slug: "your-article-slug"
tags: ["Tag1", "Tag2", "Tag3"]
coverImage: "/path-to-cover-image.jpg" # Optional
---

# Your Article Title

Write your article content here using Markdown syntax.

## Images

Include images using Markdown syntax:
![Alt text](/images/your-image.jpg)

## Videos

Include videos using HTML video tags:
<video width="100%" controls>
  <source src="/videos/your-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## Formatting Examples

### Text Formatting
- **Bold text**
- *Italic text*
- ~~Strikethrough~~

### Lists
1. Numbered list item
2. Another numbered item

- Bullet point
- Another bullet point

### Code Blocks
\```javascript
const example = "This is a code block";
console.log(example);
\```

### Blockquotes
> This is a blockquote

### Links
[Link text](https://example.com)
```

## File Organization

1. Place all MDX files in the `articles` folder
2. Store images in `public/images`
3. Store videos in `public/videos`
4. Use kebab-case for file names (e.g., `your-article-title.mdx`)

## Metadata Requirements

- `title`: String (required)
- `date`: YYYY-MM-DD format (required)
- `author`: String (required)
- `description`: String (required)
- `slug`: Kebab-case string (required)
- `tags`: Array of strings (required)
- `coverImage`: Path to image file (optional)