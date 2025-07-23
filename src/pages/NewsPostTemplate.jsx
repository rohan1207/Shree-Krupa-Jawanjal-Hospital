import React, { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../config";
import { useParams, Link } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import Navbar from "../components/Navbar";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiShareFill,
  RiArrowLeftLine,
  RiCalendarLine,
  RiFolder2Line,
} from "react-icons/ri";

const NewsPostTemplate = () => {
  const { postId } = useParams();
  const {
    getPostById,
    getRelatedPosts,
    isLoading: contextLoading,
  } = useNewsContext();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading post with ID:", postId);
      setLoading(true);
      setError(null);

      try {
        // Wait for the post data
        const currentPost = await getPostById(postId);
        console.log("Found post:", currentPost);

        if (!currentPost) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        setPost(currentPost);
        // Get related posts
        const related = await getRelatedPosts(postId, currentPost.category);
        console.log("Related posts:", related);
        setRelatedPosts(related);
      } catch (err) {
        console.error("Error loading post:", err);
        setError(err.message || "Failed to load post");
      }
      setLoading(false);
    };

    if (postId) {
      fetchData();
    }
  }, [postId, getPostById, getRelatedPosts]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post?.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "instagram":
        window.open("https://instagram.com", "_blank");
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${text} ${url}`,
          "_blank"
        );
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: post?.title,
            text: post?.content?.substring(0, 100) + "...",
            url: url,
          });
        }
    }
    setIsShareMenuOpen(false);
  };

  if (loading || contextLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || "Post Not Found"}
        </h2>
        <p className="text-gray-600 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-10">
        <Link
          to="/"
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <RiArrowLeftLine size={24} className="text-gray-700" />
        </Link>
      </div>

      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Image Container */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8 aspect-[16/9] relative">
            <img
              src={`${API_BASE_URL}${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-600/10 to-transparent mix-blend-overlay" />
          </div>

          {/* Post Header */}
          <div className="max-w-3xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <RiCalendarLine className="text-teal-600" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <RiFolder2Line className="text-teal-600" />
                <span>{post.category}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Share Button */}
            <div className="relative mb-8">
              <button
                onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
              >
                <RiShareFill className="text-teal-600" />
                <span className="text-sm font-medium text-gray-700">Share</span>
              </button>

              {/* Share Menu */}
              {isShareMenuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 min-w-[160px]">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 w-full transition-colors"
                  >
                    <RiFacebookCircleFill className="text-teal-600 text-xl" />
                    <span className="text-sm text-gray-700">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("instagram")}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 w-full transition-colors"
                  >
                    <RiInstagramFill className="text-pink-600 text-xl" />
                    <span className="text-sm text-gray-700">Instagram</span>
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 w-full transition-colors"
                  >
                    <RiWhatsappFill className="text-green-600 text-xl" />
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </button>
                </div>
              )}
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-teal">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </article>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-100">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost._id}
                      to={`/news/${relatedPost._id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <RiCalendarLine />
                            <span>{relatedPost.date}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsPostTemplate;
