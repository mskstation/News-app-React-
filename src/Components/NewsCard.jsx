import { ExternalLink } from "lucide-react";

function NewsCard({ article }) {
  return (
    <article className="news-card">

      <div className="news-image">
        <img
          src={
            article.urlToImage ||
            "https://placehold.co/600x350?text=NEWS"
          }
          alt={article.title}
        />
      </div>

      <div className="news-content">

        <div className="news-meta">
          <span>
            {article.source?.name || "News"}
          </span>

          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        <h2>{article.title}</h2>

        <p>
          {article.description ||
            "Read the complete story for more information."}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Read Article
          <ExternalLink size={16} />
        </a>

      </div>

    </article>
  );
}

export default NewsCard;