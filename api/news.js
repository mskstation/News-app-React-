
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Server API key missing. Set NEWS_API_KEY in environment variables.",
      });
    }

    const categoryQueries = {
      general: "India news",
      technology: "technology news India",
      sports: "sports news India",
      business: "business news India",
      entertainment: "entertainment news India",
      health: "health news India",
    };

    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : "general";

    const query = categoryQueries[category] || categoryQueries.general;

    const params = new URLSearchParams({
      q: query,
      sortBy: "publishedAt",
      pageSize: "12",
      apiKey,
    });

    const response = await fetch(
      `https://newsapi.org/v2/everything?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return res.status(response.status || 502).json({
        message: data.message || "NewsAPI request failed.",
      });
    }

    return res.status(200).json({
      articles: Array.isArray(data.articles) ? data.articles : [],
    });
  } catch {
    return res.status(500).json({
      message: "Unable to fetch news right now.",
    });
  }
}
