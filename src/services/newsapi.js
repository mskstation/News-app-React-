const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Using /everything endpoint instead of /top-headlines for better coverage
const API_URL = "https://newsapi.org/v2/everything";

// Search queries for different categories
const categoryQueries = {
  general: "India news",
  technology: "technology news India",
  sports: "sports news India",
  business: "business news India",
  entertainment: "entertainment news India",
  health: "health news India"
};

export const getNews = async (category = "general") => {
  try {
    const searchQuery = categoryQueries[category] || categoryQueries.general;
    const url = `${API_URL}?q=${encodeURIComponent(searchQuery)}&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;
    console.log("Fetching from:", url);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    console.log("NEWS ARTICLES:", data.articles);
    console.log("TOTAL NEWS:", data.articles?.length);
    
    // Check for API errors
    if (data.status === "error") {
      console.error("API Error:", data.message);
      throw new Error(data.message);
    }

    return data.articles || [];
  } catch (error) {
    console.error("News API Error:", error);
    throw error;
  }
};