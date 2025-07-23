import React from "react";
import { useParams, Link } from "react-router-dom";
import { whyChooseUsData } from "../data/Why_choose_us_data";
import { ArrowLeft } from "lucide-react";

const ModelDetailTemplate = () => {
  const { slug } = useParams();
  const item = whyChooseUsData.find((data) => data.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Content not found</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80 w-full">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
                {item.title}
              </h1>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailTemplate;
