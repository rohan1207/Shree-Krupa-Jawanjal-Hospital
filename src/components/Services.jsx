import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUserMd,
  FaXRay,
  FaBaby,
  FaBone,
  FaHospital,
  FaFlask,
  FaProcedures,
  FaUserNurse,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaStethoscope className="w-8 h-8" />,
    title: "General Medicine",
    description:
      "Comprehensive medical care for adults, treating a wide range of conditions.",
    link: "general-medicine",
  },
  {
    id: 2,
    icon: <FaHeartbeat className="w-8 h-8" />,
    title: "Cardiology",
    description:
      "Expert care for heart conditions with advanced diagnostic and treatment options.",
    link: "cardiology",
  },
  {
    id: 3,
    icon: <FaUserMd className="w-8 h-8" />,
    title: "Obstetrics & Gynecology",
    description:
      "Specialized care for women's health, pregnancy, and reproductive medicine.",
    link: "obstetrics-gynecology",
  },
  {
    id: 4,
    icon: <FaFlask className="w-8 h-8" />,
    title: "Nephrology",
    description:
      "Treatment of kidney diseases and disorders with personalized care plans.",
    link: "nephrology",
  },
  {
    id: 5,
    icon: <FaProcedures className="w-8 h-8" />,
    title: "Gastroenterology",
    description:
      "Diagnosis and treatment of digestive system and gastrointestinal disorders.",
    link: "gastroenterology",
  },
  {
    id: 6,
    icon: <FaHospital className="w-8 h-8" />,
    title: "Medical Oncology",
    description: "Advanced cancer care with comprehensive treatment protocols.",
    link: "medical-oncology",
  },
  {
    id: 7,
    icon: <FaXRay className="w-8 h-8" />,
    title: "Radiology",
    description:
      "Cutting-edge imaging services for accurate diagnosis and treatment planning.",
    link: "radiology",
  },
  {
    id: 8,
    icon: <FaBaby className="w-8 h-8" />,
    title: "Pediatrics",
    description:
      "Specialized healthcare for infants, children, and adolescents.",
    link: "pediatrics",
  },
  {
    id: 9,
    icon: <FaBone className="w-8 h-8" />,
    title: "Orthopedic Specialist",
    description: "Expert care for bone, joint, and musculoskeletal conditions.",
    link: "orthopedic",
  },
  {
    id: 10,
    icon: <FaUserNurse className="w-8 h-8" />,
    title: "Urology",
    description:
      "Treatment of urinary tract and reproductive system disorders.",
    link: "urology",
  },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayedServices = isMobile
    ? showAll
      ? services
      : services.slice(0, 4)
    : services;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-amber-600 text-md sm:text-2xl font-medium tracking-wide uppercase"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
          >
            Medical Excellence in Every Specialty
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {displayedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-teal-50/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100/30"
            >
              {" "}
              <div className="p-3 sm:p-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl inline-block">
                <div className="text-white">{service.icon}</div>
              </div>{" "}
              <h3 className="mt-3 sm:mt-4 text-base sm:text-xl font-semibold text-gray-800 line-clamp-1">
                {service.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 line-clamp-2 sm:line-clamp-none">
                {service.description}
              </p>{" "}
              <Link
                to={`/services/${service.link}`}
                className="group inline-block"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Service link clicked:", service.link);
                }}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-2 sm:mt-4 inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-sm sm:text-base font-medium cursor-pointer transition-all duration-300"
                >
                  Learn more
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button - Mobile Only */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 text-center md:hidden"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 hover:shadow-teal-100"
            >
              {showAll ? "Show Less" : "View All Services"}
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
