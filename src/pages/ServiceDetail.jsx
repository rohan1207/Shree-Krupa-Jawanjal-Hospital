import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ServiceDetail.css";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  Award,
  Microscope,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Activity,
  Zap,
} from "lucide-react";
import serviceDetailsData from "../data/json/ServiceDetails.json";
import ErrorBoundary from "../components/ErrorBoundary";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentTreatmentIndex, setCurrentTreatmentIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const sectionRefs = {
    overview: useRef(null),
    doctor: useRef(null),
    team: useRef(null),
    treatments: useRef(null),
    technology: useRef(null),
    testimonials: useRef(null),
  };

  // Check if service exists, if not redirect to services page
  useEffect(() => {
    if (!serviceDetailsData[serviceId]) {
      console.error("Service not found:", serviceId);
      navigate("/services");
    }
  }, [serviceId, navigate]);

  // If service not found, don't render anything (we're redirecting)
  if (!serviceDetailsData[serviceId]) {
    return null;
  }

  const serviceData = serviceDetailsData[serviceId];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "doctor", label: "Message from Doctor" },
    { id: "team", label: `Comprehensive ${serviceData.name} Care Team` },
    { id: "treatments", label: "Our Treatments" },
    { id: "technology", label: "Latest Technology Utilization" },
  ];

  useEffect(() => {
    // Auto slide for team members on mobile
    const teamInterval = setInterval(() => {
      if (window.innerWidth < 768) {
        setCurrentTeamIndex(
          (prev) => (prev + 1) % serviceData.team.members.length
        );
      }
    }, 3000);

    // Auto slide for technologies on mobile
    const techInterval = setInterval(() => {
      if (window.innerWidth < 768) {
        setCurrentTechIndex(
          (prev) => (prev + 1) % serviceData.technologies.length
        );
      }
    }, 3000);

    // Clear intervals on unmount
    return () => {
      clearInterval(teamInterval);
      clearInterval(techInterval);
    };
  }, [serviceData.team.members.length, serviceData.technologies.length]);

  const nextTreatment = () => {
    setCurrentTreatmentIndex(
      (prev) => (prev + 1) % serviceData.treatments.length
    );
  };

  const prevTreatment = () => {
    setCurrentTreatmentIndex(
      (prev) =>
        (prev - 1 + serviceData.treatments.length) %
        serviceData.treatments.length
    );
  };

  const nextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % serviceData.team.members.length);
  };

  const prevTeam = () => {
    setCurrentTeamIndex(
      (prev) =>
        (prev - 1 + serviceData.team.members.length) %
        serviceData.team.members.length
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for the sticky header

      // Find which section is currently in view
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prev) => (prev + 1) % serviceData.testimonials.length
      );
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, [serviceData.testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev + 1) % serviceData.testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) =>
        (prev - 1 + serviceData.testimonials.length) %
        serviceData.testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-16 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden pt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                {serviceData.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {serviceData.overview.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-appointment">
                  {" "}
                  <div className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all">
                    Book Appointment
                  </div>
                </Link>{" "}
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-all inline-block"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Right Image */}
            <div className="relative sm:mt-[35px] mt-[0px]   ">
              <div className="relative w-full pt-[100%] rounded-full">
                <img
                  src={serviceData.heroImage}
                  alt={serviceData.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-full shadow-xl hero-service-image"
                />
                {/* Dotted Circle */}
                <div className="absolute -inset-3 border-2 border-dashed border-teal-600/30 rounded-full animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Overview Section */}
        <section
          ref={sectionRefs.overview}
          id="overview"
          className="scroll-mt-32"
        >
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {serviceData.overview.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {serviceData.overview.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {serviceData.overview.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Elements */}
            <div className="relative h-64 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-teal-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Excellence in {serviceData.name} Care
                  </h3>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Stethoscope className="w-16 h-16 text-teal-300 opacity-50" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Activity className="w-12 h-12 text-purple-300 opacity-50" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Doctor Section */}
        <section ref={sectionRefs.doctor} id="doctor" className="scroll-mt-32">
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                      Message from Our Founder
                    </h2>
                    <blockquote className="text-lg text-gray-600 leading-relaxed mb-8 italic">
                      "{serviceData.doctor.message}"
                    </blockquote>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {serviceData.doctor.name}
                      </h3>
                      <p className="text-teal-600 font-medium">
                        {serviceData.doctor.title}
                      </p>
                      <div className="space-y-1 mt-4">
                        {serviceData.doctor.credentials.map((cred, index) => (
                          <p key={index} className="text-sm text-gray-500">
                            • {cred}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={serviceData.doctor.image}
                    alt={serviceData.doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section ref={sectionRefs.team} id="team" className="scroll-mt-32">
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our {serviceData.name} Team
              </h2>
              <p className="text-lg text-gray-600">
                {serviceData.team.description}
              </p>
            </div>{" "}
            {/* Desktop View */}
            <div className="max-w-6xl mx-auto">
              <div className="hidden md:block team-container">
                {serviceData.team.members.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-xs flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 text-left flex-grow">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-teal-600 text-sm font-medium">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Mobile View */}
            <div className="relative md:hidden">
              <motion.div
                key={currentTeamIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={serviceData.team.members[currentTeamIndex].image}
                    alt={serviceData.team.members[currentTeamIndex].name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {serviceData.team.members[currentTeamIndex].name}
                  </h3>
                  <p className="text-teal-600 text-sm font-medium">
                    {serviceData.team.members[currentTeamIndex].role}
                  </p>
                </div>
              </motion.div>

              {/* Mobile Navigation */}
              <button
                onClick={prevTeam}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextTeam}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Mobile Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {serviceData.team.members.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTeamIndex
                        ? "bg-[#f84a3e] scale-125"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Treatments Section */}
         {/* Treatments Section */}
          <section
            ref={sectionRefs.treatments}
            id="treatments"
            className="scroll-mt-32"
          >
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Our Treatments
                </h2>
                <p className="text-lg text-gray-600">
                  Comprehensive treatment options tailored to your needs
                </p>
              </div>{" "}
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[350px] lg:h-[500px]">
                      <img
                        src={
                          serviceData.treatments[currentTreatmentIndex].image
                        }
                        alt={serviceData.treatments[currentTreatmentIndex].name}
                        className="w-full h-full object-fit"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-purple-600/20"></div>
                    </div>
                    <div className="h-[350px] lg:h-[500px] p-8 lg:p-12 flex flex-col overflow-y-auto no-scrollbar">
                      <motion.div
                        key={currentTreatmentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col h-full"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {serviceData.treatments[currentTreatmentIndex].name}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {
                            serviceData.treatments[currentTreatmentIndex]
                              .description
                          }
                        </p>
                        <div className="space-y-2 flex-grow">
                          {serviceData.treatments[
                            currentTreatmentIndex
                          ].benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <button
                  onClick={prevTreatment}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
                </button>
                <button
                  onClick={nextTreatment}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
                </button>

                {/* Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {serviceData.treatments.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTreatmentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTreatmentIndex
                          ? "bg-teal-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

        {/* Technology Section - Updated for mobile carousel */}
        <section
          ref={sectionRefs.technology}
          id="technology"
          className="scroll-mt-32"
        >
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Technology
              </h2>
              <p className="text-lg text-gray-600">
                Shri Krupa Jawanjal is equipped with sophisticated equipments including
              </p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {serviceData.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {tech.name}
                    </h3>{" "}
                    <button className="text-teal-600 font-medium flex items-center gap-1 group">
                      Learn more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="relative md:hidden">
              <motion.div
                key={currentTechIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={serviceData.technologies[currentTechIndex].image}
                    alt={serviceData.technologies[currentTechIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {serviceData.technologies[currentTechIndex].name}
                  </h3>
                  <button className="text-[#f84a3e] font-medium flex items-center gap-1">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Mobile Navigation */}
              <button
                onClick={() =>
                  setCurrentTechIndex(
                    (prev) =>
                      (prev - 1 + serviceData.technologies.length) %
                      serviceData.technologies.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  setCurrentTechIndex(
                    (prev) => (prev + 1) % serviceData.technologies.length
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Mobile Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {serviceData.technologies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTechIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTechIndex
                        ? "bg-teal-600 scale-125"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Patient Testimonials Section */}
        <section
          ref={sectionRefs.testimonials}
          className="bg-gradient-to-b from-white to-gray-50 py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Patient Testimonials
              </h2>
              <p className="text-lg text-gray-600">
                Hear from our patients about their experiences and success
                stories
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1">
                      <div className="relative w-32 h-32 mx-auto md:w-48 md:h-48">
                        <img
                          src={
                            serviceData.testimonials[currentTestimonialIndex]
                              .image
                          }
                          alt={
                            serviceData.testimonials[currentTestimonialIndex]
                              .name
                          }
                          className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 text-center md:text-left">
                      <blockquote className="text-xl text-gray-700 italic mb-6">
                        "
                        {
                          serviceData.testimonials[currentTestimonialIndex]
                            .quote
                        }
                        "
                      </blockquote>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {
                            serviceData.testimonials[currentTestimonialIndex]
                              .name
                          }
                        </h3>
                        <p className="text-teal-600">
                          {
                            serviceData.testimonials[currentTestimonialIndex]
                              .treatment
                          }
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-1">
                          {[
                            ...Array(
                              serviceData.testimonials[currentTestimonialIndex]
                                .rating
                            ),
                          ].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group hidden md:block"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 group hidden md:block"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
              </button>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2 md:hidden">
                {serviceData.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonialIndex
                        ? "bg-teal-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Contact Strip */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Have any questions or need a consultation?
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                Our medical experts are here to help. Get in touch with us for
                any medical queries or appointment scheduling.
              </p>{" "}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-teal-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the export with ErrorBoundary
export default function ServiceDetailWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <ServiceDetail />
    </ErrorBoundary>
  );
}
