import { ArticleMetadata } from "@/types/article";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: ArticleMetadata;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link 
      to={`/articles/${article.slug}`}
      className="block group transition-all duration-300 hover:translate-y-[-2px]"
    >
      <article className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="space-y-4">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <div className="space-y-2">
            {article.tags && article.tags.length > 0 && (
              <div className="flex gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-500 line-clamp-2">
              {article.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
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
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;