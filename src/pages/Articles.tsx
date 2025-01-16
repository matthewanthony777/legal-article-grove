import { getAllArticles } from "@/utils/articleLoader";
import ArticleCard from "@/components/ArticleCard";

const Articles = () => {
  const articles = getAllArticles();

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