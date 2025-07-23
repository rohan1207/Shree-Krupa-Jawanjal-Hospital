import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        console.log("News data received:", response.data); // Debug log
        if (response.data.success && Array.isArray(response.data.data)) {
          setNews(response.data.data);
          setError(null);
        } else {
          throw new Error(response.data.message || "No news data received or data is not in expected format");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load news. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getPostById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/news/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching post by ID: ${id}`, error);
      return null;
    }
  };

  const getRelatedPosts = async (currentPostId, category) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/news/related?category=${category}&excludeId=${currentPostId}`
      );
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching related posts:", error);
      return [];
    }
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        getPostById,
        getRelatedPosts,
        loading,
        error,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
