import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMailOpen, HiPhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { doctors } from "../data/doctors";

const Doctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto slide for mobile
  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isMobile]);

  // Handle manual navigation
  const handleDragEnd = (event, info) => {
    if (!isMobile) return;

    const swipe = info.offset.x;
    if (Math.abs(swipe) > 50) {
      if (swipe > 0) {
        setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % doctors.length);
      }
    }
  };

  if (isMobile) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-amber-600 text-md sm:text-2xl font-medium tracking-wide uppercase"
            >
              Our Medical Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900"
            >
              Meet Our Expert Doctors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto px-4"
            >
              Our team of highly qualified and experienced medical professionals
              is dedicated to providing exceptional healthcare services.
            </motion.p>
          </div>

          <div className="relative w-full overflow-hidden min-h-[600px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0 px-4"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative overflow-hidden h-[300px]">
                    <img
                      src={doctors[currentIndex].image}
                      alt={doctors[currentIndex].name}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                        >
                          <HiOutlineMailOpen className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                        >
                          <HiPhone className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doctors[currentIndex].name}
                    </h3>
                    <p className="mt-1 text-teal-600">
                      {doctors[currentIndex].experience}
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/doctor/${doctors[currentIndex].id}`}
                        className="w-full text-center bg-transparent border-2 border-teal-600 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-600 hover:text-white transition-colors duration-300"
                      >
                        Read More
                      </Link>
                      {doctors[currentIndex].specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <Link to={`/book-appointment`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 py-3 px-4 bg-teal-600 text-white rounded-xl font-medium shadow-lg hover:bg-teal-700 transition-all duration-300"
                      >
                        Book Appointment
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-teal-600 w-4" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-amber-600 text-md sm:text-2xl font-medium tracking-wide uppercase"
          >
            Our Medical Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
          >
            Meet Our Expert Doctors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Our team of highly qualified and experienced medical professionals
            is dedicated to providing exceptional healthcare services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl justify-center mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-t-2xl h-[400px]">
                {/* Image Container */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-4 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        <HiOutlineMailOpen className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        <HiPhone className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-sm text-gray-200 line-clamp-4">
                      {doctor.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-teal-600">{doctor.experience}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-600"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {doctor.qualifications && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Qualifications
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                      {doctor.qualifications.slice(0, 2).map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {doctor.services && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Key Services
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 pt-0">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link
                    to={`/doctor/${doctor.id}`}
                    className="w-full text-center bg-transparent border-2 border-teal-500 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
                <Link to="/book-appointment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
