import React from "react";
import { Link } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import { API_BASE_URL } from "../config";

const events = [
  {
    date: "12 Jan",
    title:
      "CME on Chest Surgery in Chikhli, led by Dr SukhRam Patil is scheduled for Jan 12, 2025",
    location: "Kolkata",
  },
  {
    date: "15 Jan",
    title:
      "CME on BMT in  Chikhli, led by Dr. S.P.Yadav is scheduled for Jan 15, 2025",
    location: "Chikhli",
  },
];

const NewsEvents = () => {
  const { news, loading, error } = useNewsContext();

  if (loading) {
    return (
      <section className="bg-white px-4 sm:px-6 py-16 sm:py-24 mt-15">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-teal-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-4 sm:px-6 py-16 sm:py-24 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  const featuredNews = news && news.length > 0 ? news[0] : null;
  const recentNews = news && news.length > 1 ? news.slice(1, 4) : [];

  return (
    <section className="bg-white px-4 sm:px-6 py-16 sm:py-24 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header - Made responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            News & Events
          </h2>
          <Link
            to="/posts-blog"
            className="text-teal-600 text-sm sm:text-base flex items-center gap-1 hover:underline"
          >
            View All News & Events <span className="text-lg sm:text-xl">➤</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured News */}
          {featuredNews && (
            <div className="lg:col-span-2">
              <Link to={`/news/${featuredNews._id}`} className="block group">
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <div className="relative w-full pt-[60%] sm:pt-[50%]">
                    <img
                      src={`${API_BASE_URL}${featuredNews.image}`}
                      alt={featuredNews.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      {featuredNews.date}
                    </p>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {featuredNews.title}
                    </h3>
                    <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Read Post <span className="text-lg">➤</span>
                    </span>
                  </div>
                </div>
              </Link>

              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                {recentNews.map((item) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="flex items-start gap-3 sm:gap-4 group"
                  >
                    <div className="relative w-16 sm:w-20 h-14 sm:h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={`${API_BASE_URL}${item.image}`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                      <h3 className="text-sm sm:text-base font-medium line-clamp-2 group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Events Column */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div className="text-center bg-teal-100 rounded px-2 py-1 min-w-[60px]">
                    <span className="block text-teal-600 font-bold text-lg">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="block text-teal-500 text-sm">
                      {event.date.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-medium mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-lg">📍</span> {event.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
