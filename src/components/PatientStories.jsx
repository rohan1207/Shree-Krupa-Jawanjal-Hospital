import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sunita Patil",
    treatment: "Total Knee Replacement",
    story: "I suffered from severe knee pain for years. After my total knee replacement surgery at Shree Krupa Jawanjal Hospital, I am now pain-free and can walk for miles. The orthopedic team is fantastic!"
  },
  {
    name: "Ramesh Jadhav",
    treatment: "Accidental Emergency Care",
    story: "After a serious road accident, the emergency team here saved my life. Their quick response and expert care were incredible. I am forever grateful for their dedication."
  },
  {
    name: "Anjali Mehta",
    treatment: "Spinal Fusion Surgery",
    story: "Living with chronic back pain was debilitating. The spinal surgery I underwent has given me a new lease on life. The neurosurgeons and staff were supportive throughout my recovery."
  },
  {
    name: "Vikram Singh",
    treatment: "Complex Fracture Operation",
    story: "I had a complex fracture in my arm, but the surgeons here performed a miracle. My arm has healed perfectly, and I have regained full mobility. Excellent care and expertise."
  },
  {
    name: "Priya Sharma",
    treatment: "Arthroscopic Surgery",
    story: "The minimally invasive arthroscopic surgery on my shoulder was a huge success. The recovery was quick, and the results are amazing. Highly recommend this hospital for sports injuries."
  },
  {
    name: "Amit Kumar",
    treatment: "Hip Replacement",
    story: "My hip replacement surgery has dramatically improved my quality of life. I can now enjoy my daily activities without any pain. The entire process was smooth and professional."
  },
];

const PatientStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Increased interval for better readability

    return () => clearInterval(timer);
  }, [isMobile]);

  const handleDragEnd = (event, info) => {
    if (!isMobile) return;

    const swipe = info.offset.x;
    if (Math.abs(swipe) > 50) {
      if (swipe > 0) {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }
  };

  if (isMobile) {
    return (
      <section className="py-10 px-4 bg-gray-50 text-center overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Patient Stories
        </h2>
        <div className="relative w-full h-[320px] mx-auto">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0 p-2"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <StoryCard story={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#f04e30] w-4" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
            Patient Stories
          </h2>
          <p className="text-gray-600">
            Real experiences shared by our valued patients about their journey to better health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StoryCard key={index} story={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryCard = ({ story }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col h-full border-t-4 border-teal-500">
      <p className="text-gray-600 italic text-base mb-4 flex-grow">"{story.story}"</p>
      <div className="mt-auto">
        <p className="font-bold text-gray-900 text-lg">{story.name}</p>
        <p className="text-teal-600 font-medium">{story.treatment}</p>
      </div>
    </div>
  );
};

export default PatientStories;
