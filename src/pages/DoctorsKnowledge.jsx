import React from "react";
import Navbar from "../components/Navbar";
import { RiPlayCircleFill, RiLightbulbFlashLine } from "react-icons/ri";

const DoctorsKnowledge = () => {
  const videos = [
    {
      id: 1,
      title: "Expert Medical Advice",
      doctor: "Dr. Sumeet Jagtap",
      src: "https://www.facebook.com/plugins/video.php?height=308&href=https%3A%2F%2Fwww.facebook.com%2Fsunil.jagtap.7545%2Fvideos%2F723891925288226%2F&show_text=false&width=560&t=0",
    },
    {
      id: 2,
      title: "Healthcare Insights",
      doctor: "Dr. Pallavi Jagtap",
      src: "https://www.facebook.com/plugins/video.php?height=308&href=https%3A%2F%2Fwww.facebook.com%2Fsunil.jagtap.7545%2Fvideos%2F1641083132905079%2F&show_text=false&width=560&t=0",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Container with gradient background */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            {/* Page Header */}
            <div className="text-center mb-12 relative">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-5 p-2">
                Expert Knowledge Hub
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn from our experienced doctors through their insightful
                videos and professional advice.
              </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                >
                  <div className="aspect-video relative rounded-t-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <iframe
                      src={video.src}
                      width="100%"
                      height="100%"
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <RiLightbulbFlashLine className="text-blue-600" />
                      {video.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <p className="text-gray-600 mb-6">
                Our doctors regularly share their expertise and insights to help
                you make informed decisions about your health.
              </p>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow group">
                <RiPlayCircleFill className="text-xl transition-transform group-hover:rotate-12" />
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorsKnowledge;
