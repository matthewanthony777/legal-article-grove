import { useEffect, useState } from "react";
import { getAllArticles, initializeArticles } from "@/utils/articleLoader";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types/article";
import { Loader2 } from "lucide-react";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        await initializeArticles();
        setArticles(getAllArticles());
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Latest Articles
            </h1>
            <p className="text-lg text-gray-600">
              Insights and perspectives on modern technology
            </p>
          </div>
          <div className="grid gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;