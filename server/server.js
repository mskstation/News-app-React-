import "dotenv/config";
import express from "express";

const app = express();
const PORT = 3001;

const categoryQueries = {
  general: "India news",
  technology: "technology news India",
  sports: "sports news India",
  business: "business news India",
  entertainment: "entertainment news India",
  health: "health news India",
};

app.get("/api/news", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Server API key missing. Check the root .env file.",
      });
    }

    const category = req.query.category || "general";
    const query = categoryQueries[category] || categoryQueries.general;

    const params = new URLSearchParams({
      q: query,
      sortBy: "publishedAt",
      pageSize: "12",
      apiKey,
    });

    const response = await fetch(
      `https://newsapi.org/v2/everything?${params}`
    );

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return res.status(response.status || 502).json({
        message: data.message || "NewsAPI request failed.",
      });
    }

    res.json({
      articles: Array.isArray(data.articles) ? data.articles : [],
    });
  } catch {
    res.status(500).json({ message: "Unable to fetch news right now." });
  }
});

app.listen(PORT, () => {
  console.log(`News API server running at http://localhost:${PORT}`);
});
