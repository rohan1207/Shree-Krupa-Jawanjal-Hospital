import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const advantages = [
  {
    id: 1,
    image: "/advantage1.png",
    title: "Expert Medical Care",
    description: "Access to qualified healthcare professionals",
  },
  {
    id: 2,
    image: "/advantage2.png",
    title: "Convenient Online Consultations",
    description: "Get medical advice from the comfort of your home",
  },
];

const AdvantagesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advantages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.95,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
      scale: 0.95,
    },
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % advantages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? advantages.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Why Choose{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Shri Krupa Jawanjal E-Clinic?
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"
        />
      </div>

      {/* Main Slider Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full max-w-4xl h-full">
                  <img
                    src={advantages[currentIndex].image}
                    alt={
                      advantages[currentIndex].title ||
                      `Advantage ${currentIndex + 1}`
                    }
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition-colors" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
          {advantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  : "w-3 h-3 bg-gray-300 hover:bg-blue-300 rounded-full"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Stats/Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">24/7</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Available 24/7</h4>
          <p className="text-gray-600 text-sm">
            Round the clock medical support
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">✓</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Certified Doctors
          </h4>
          <p className="text-gray-600 text-sm">
            Licensed healthcare professionals
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">🔒</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
          <p className="text-gray-600 text-sm">Your health data is protected</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvantagesSlider;
