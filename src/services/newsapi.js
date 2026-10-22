
export const getNews = async (category = "general") => {
  try {
    const response = await fetch(
      `/api/news?category=${encodeURIComponent(category)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "News load nahi ho paayi.");
    }

    return Array.isArray(data.articles) ? data.articles : [];
  } catch (error) {
    throw new Error(error.message || "News server se connect nahi ho paaya.");
  }
};
