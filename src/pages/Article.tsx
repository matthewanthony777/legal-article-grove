import { useParams } from "react-router-dom";
import { getArticleBySlug } from "@/utils/articleLoader";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Article not found</h1>
          <Button onClick={() => navigate("/articles")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const Content = article.content;

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/articles")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>
        
        <header className="space-y-4 mb-8">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex gap-2">
            {article.tags?.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{article.author}</span>
            <span>•</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-pre:bg-gray-800 prose-pre:text-white">
          <Content />
        </div>
      </article>
    </div>
  );
};

export default Article;