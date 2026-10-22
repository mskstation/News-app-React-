const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = "https://newsapi.org/v2/everything";

const categoryQueries = {
  general: "India news",
  technology: "technology news India",
  sports: "sports news India",
  business: "business news India",
  entertainment: "entertainment news India",
  health: "health news India",
};

export const getNews = async (category = "general") => {
  if (!API_KEY) {
    throw new Error(
      "API key missing: project ke root folder mein .env file banao aur VITE_NEWS_API_KEY set karo."
    );
  }

  const searchQuery = categoryQueries[category] || categoryQueries.general;
  const params = new URLSearchParams({
    q: searchQuery,
    sortBy: "publishedAt",
    pageSize: "12",
    apiKey: API_KEY,
  });

  let response;
  try {
    response = await fetch(`${API_URL}?${params.toString()}`);
  } catch (error) {
    throw new Error(
      "Network request fail hui. Internet check karo. NewsAPI browser/CORS ya plan restrictions bhi ho sakti hain."
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("NewsAPI se valid response nahi mila.");
  }

  if (!response.ok || data.status === "error") {
    if (response.status === 401) {
      throw new Error("NewsAPI key invalid hai (401). .env mein key check karo.");
    }
    if (response.status === 403) {
      throw new Error("NewsAPI access denied (403). Account plan/endpoint permission check karo.");
    }
    if (response.status === 429) {
      throw new Error("NewsAPI request limit poori ho gayi (429). Baad mein try karo.");
    }
    throw new Error(data.message || `NewsAPI error: ${response.status}`);
  }

  return Array.isArray(data.articles) ? data.articles : [];
};
