import React from "react";
import { Link } from "react-router-dom";
import {
  RiVideoLine,
  RiArrowRightLine,
  RiLightbulbFlashLine,
  RiPlayCircleLine,
} from "react-icons/ri";

const ExpertKnowledgeStrip = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 rounded-3xl relative overflow-hidden shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-pattern transform rotate-12"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-gradient-to-r from-teal-300/20 to-indigo-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-r from-indigo-400/20 to-teal-500/20 rounded-full blur-2xl"></div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-teal-300/30 to-indigo-500/30 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Side - Content */}
              <div className="text-white md:w-2/3">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <RiLightbulbFlashLine className="text-4xl text-teal-100" />
                  <span className="bg-gradient-to-r from-teal-100 via-white to-indigo-100 bg-clip-text text-transparent">
                    Our Experts' Knowledge Hub
                  </span>
                </h2>
                <p className="text-teal-50 text-lg mb-8 max-w-2xl leading-relaxed">
                  Discover valuable insights, health tips, and professional
                  advice directly from our experienced doctors through engaging
                  video content.
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-teal-400/20 to-indigo-400/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:from-teal-400/30 hover:to-indigo-400/30 hover:scale-105">
                    <RiPlayCircleLine className="text-teal-100" />
                    Expert Medical Advice
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-400/20 to-teal-400/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:from-indigo-400/30 hover:to-teal-400/30 hover:scale-105">
                    <RiVideoLine className="text-teal-100" />
                    Healthcare Tips
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-teal-400/20 to-indigo-400/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:from-teal-400/30 hover:to-indigo-400/30 hover:scale-105">
                    <RiLightbulbFlashLine className="text-teal-100" />
                    Professional Insights
                  </div>
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="md:w-1/3 flex justify-center">
                <Link
                  to="/doctors-knowledge"
                  className="group relative inline-flex items-center gap-2 bg-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-white opacity-100 group-hover:opacity-95 transition-opacity rounded-xl"></span>
                  <span className="relative flex items-center gap-2 text-teal-600 group-hover:text-teal-700">
                    Watch Our Videos
                    <RiArrowRightLine className="text-xl transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertKnowledgeStrip;
