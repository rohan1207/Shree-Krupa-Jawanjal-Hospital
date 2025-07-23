import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import Navbar from "../components/Navbar";
import { RiCalendarLine, RiFolder2Line } from "react-icons/ri";

const Posts_Blog = () => {
  const { news, isLoading, error } = useNewsContext();
  const [filteredNews, setFilteredNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Service", "Health Tips", "Function"];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter((post) => post.category === activeCategory));
    }
  }, [activeCategory, news]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading News
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            {error}. Please try again later or contact support if the problem
            persists.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          Latest News & Events
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeCategory === category
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1"
            >
              <Link to={`/news/${post._id}`}>
                <img
                  src={`${API_BASE_URL}${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <RiCalendarLine className="mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <RiFolder2Line className="ml-4 mr-2" />
                  <span>{post.category}</span>
                </div>
                <Link
                  to={`/news/${post._id}`}
                  className="block mb-4 hover:text-teal-600 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt || post.content.substring(0, 150) + "..."}
                </p>
                <Link
                  to={`/news/${post._id}`}
                  className="inline-block text-teal-600 font-medium hover:text-teal-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              No news articles found in this category.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts_Blog;
