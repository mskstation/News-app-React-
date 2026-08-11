import { useEffect, useState } from "react";
import NewsCard from "../Components/NewsCard";
import { getNews } from "../services/newsapi";

function Home({ searchQuery = "" }) {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "Latest", value: "general" },
    { name: "Technology", value: "technology" },
    { name: "Sports", value: "sports" },
    { name: "Business", value: "business" },
    { name: "Entertainment", value: "entertainment" },
    { name: "Health", value: "health" },
  ];

  // Load news on category change
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNews(category);

        setAllArticles(data);
        // eslint-disable-next-line react-hooks/immutability
        filterArticles(data, searchQuery);
      } catch (error) {
        console.error(error);
        setError("News load nahi ho paayi.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, searchQuery]);

  // Filter articles when search query changes
  useEffect(() => {
    filterArticles(allArticles, searchQuery);
  }, [searchQuery, allArticles]);

  // Filter articles based on search query
  const filterArticles = (articlesToFilter, query) => {
    if (!query.trim()) {
      setArticles(articlesToFilter);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = articlesToFilter.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";
      const source = article.source?.name?.toLowerCase() || "";
      
      return (
        title.includes(lowercaseQuery) ||
        description.includes(lowercaseQuery) ||
        source.includes(lowercaseQuery)
      );
    });

    setArticles(filtered);
  };

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <p className="hero-label">
          TODAY'S HEADLINES
        </p>

        <h1>Latest News</h1>

        <p className="hero-text">
          India aur duniya ki latest news ek jagah.
        </p>
      </section>

      {/* NEWS SECTION */}
      <section className="news-section">

        <div className="section-header">
          <div>
            <h2>Top Headlines</h2>

            <p>
              Latest stories from trusted sources
            </p>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="categories">

          {categories.map((item) => (
            <button
              key={item.value}
              className={
                category === item.value
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setCategory(item.value)}
            >
              {item.name}
            </button>
          ))}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="loading">
            📰 Loading latest news...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && !error && articles.length === 0 && (
          <div className="error">
            ❌ No articles found. Try a different search or category.
          </div>
        )}

        {/* NEWS */}
        {!loading && !error && articles.length > 0 && (
          <>
            <div style={{ marginBottom: "10px", color: "#6b7280", fontSize: "14px" }}>
              Found {articles.length} article{articles.length !== 1 ? "s" : ""}
            </div>
            <div className="news-grid">

              {articles.map((article, index) => (
                <NewsCard
                  key={article.url || index}
                  article={article}
                />
              ))}

            </div>
          </>
        )}

      </section>

    </main>
  );
}

export default Home;