import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaHospital,
  FaTrophy,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const galleryData = {
  facilities: [
    {
      id: 1,
      image: "/carm.jpg",
      title: "Advanced C-Arm Machine",
      category: "Equipment",
    },
    {
      id: 2,
      image: "/slice.jpg",
      title: "CT Scan Facility",
      category: "Equipment",
    },
    {
      id: 3,
      image: "/facility2.avif",
      title: "Modern Patient Rooms",
      category: "Infrastructure",
    },
    {
      id: 4,
      image: "/facility9.avif",
      title: "Consultation Rooms",
      category: "Infrastructure",
    },
    {
      id: 5,
      image: "/operation5.avif",
      title: "Operation Theatre",
      category: "Infrastructure",
    },
    {
      id: 6,
      image: "/facility5.avif",
      title: "Emergency Ward",
      category: "Infrastructure",
    },
    {
      id: 7,
      image: "/facility1.avif",
      title: "ICU",
      category: "Infrastructure",
    },
    {
      id: 8,
      image: "/facility3.avif",
      title: "Nurse Care",
      category: "Facility",
    },
    {
      id: 9,
      image: "/facility4.avif",
      title: "Comfortable Bed",
      category: "Facility",
    },
    {
      id: 10,
      image: "/facility6.avif",
      title: "Eye Care",
      category: "Facility",
    },
    {
      id: 11,
      image: "/facility7.avif",
      title: "Advance Checkup room",
      category: "Facility",
    },
    {
      id: 12,
      image: "/facility8.avif",
      title: "24/7 care",
      category: "Facility",
    },
    {
      id: 13,
      image: "/facility10.avif",
      title: "spacious waiting area",
      category: "Facility",
    },
    {
      id: 14,
      image: "/facility11.avif",
      title: "high-tech equipment",
      category: "Facility",
    },
    {
      id: 15,
      image: "/facility12.avif",
      title: "24/7 nurse Available",
      category: "Facility",
    },
    {
      id: 16,
      image: "/hospital1.jpg",
      title: "Hospital Exterior",
      category: "Equipment",
    },
    {
      id: 17,
      image: "/hospital2.png",
      title: "Hospital Exterior",
      category: "Infrastructure",
    }
  ],
  operations: [
    {
      id: 1,
      image: "/operation1.avif",
      title: "Cardiac Procedures",
      category: "Medical",
    },
    {
      id: 2,
      image: "/operation3.avif",
      title: "Advanced Imaging",
      category: "Diagnostics",
    },
    {
      id: 3,
      image: "/operation2.avif",
      title: "Orthopedic Surgery",
      category: "Surgery",
    },
    {
      id: 4,
      image: "/operation4.avif",
      title: "Endoscopy Procedures",
      category: "Diagnostics",
    },
    {
      id: 5,
      image: "/operation5.avif",
      title: "surgery",
      category: "Surgery",
    },
    {
      id: 6,
      image: "/operation6.jpg",
      title: "Pediatric Care",
      category: "Medical",
    },
    {
      id: 7,
      image: "/operation7.jpg",
      title: "Gastroenterology Procedures",
      category: "Medical",
    },
  ],
  achievements: [
    {
      id: 1,
      image: "/Accrediated.jpg",
      title: "NABH Accreditation",
      category: "Certification",
    },
    {
      id: 2,
      image: "/achivment1.avif",
      title: "Best Hospital Award",
      category: "Recognition",
    },
    {
      id: 3,
      image: "/achivment2.avif",
      title: "Healthcare Excellence",
      category: "Achievement",
    },
    {
      id: 4,
      image: "/achivment3.avif",
      title: "Community Service Award",
      category: "Recognition",
    },
    {
      id: 5,
      image: "/achivment4.avif",
      title: "Innovation in Healthcare",
      category: "Achievement",
    },
    {
      id: 6,
      image: "/achivment5.avif",
      title: "Patient Care Excellence",
      category: "Recognition",
    },
    {
      id: 7,
      image: "/achivment6.avif",
      title: "Research and Development",
      category: "Achievement",
    },
    {
      id: 8,
      image: "/achivment7.avif",
      title: "Sustainability in Healthcare",
      category: "Recognition",
    },
    {
      id: 9,
      image: "/achivment9.jpg",
      title: "Public Health Initiative",
      category: "Achievement",
    },
    {
      id: 10,
      image: "/achivment10.png",
      title: "Patient Satisfaction Award",
      category: "Recognition",
    },
  ],
};

const GallerySection = ({ title, subtitle, images, expandable = true }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedImages = showAll ? images : images.slice(0, 4);

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedImages.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg bg-white"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white">
                  <h3 className="text-sm sm:text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {expandable && images.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300"
          >
            {showAll ? (
              <>
                Show Less <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                Show More <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}{" "}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-teal-50 to-teal-50">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-600 to-teal-600 rounded-full mb-8"
            >
              <FaCamera className="text-white text-3xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Our Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Explore our state-of-the-art facilities, medical procedures, and
              achievements
            </motion.p>
          </div>
        </div>
      </section>
      {/* Gallery Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GallerySection
          title="Hospital Facilities"
          subtitle="Discover our modern infrastructure and advanced medical equipment"
          images={galleryData.facilities}
        />

        <GallerySection
          title="Medical Operations"
          subtitle="View our advanced medical procedures and operations"
          images={galleryData.operations}
        />

        <GallerySection
          title="Achievements & Recognition"
          subtitle="Our milestones and accomplishments in healthcare excellence"
          images={galleryData.achievements}
        />
      </div>
      {/* Contact Strip */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-teal-50 to-teal-50 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-teal-200 to-teal-200 rounded-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <FaHospital className="mx-auto text-4xl text-teal-600 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Want to know more about our facilities?
              </h3>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                Schedule a visit to our hospital and experience our world-class
                facilities firsthand.
              </p>
              <Link to="/book-appointment">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:from-teal-700 hover:to-teal-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Book a Visit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
