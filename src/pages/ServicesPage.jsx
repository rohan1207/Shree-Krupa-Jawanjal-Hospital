import React, { useState } from "react";
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
  FaSearch,
  FaBrain,
  FaHandPaper,
  FaCamera,
  FaSyringe,
  FaBolt,
  FaAppleAlt,
  FaAmbulance,
  FaHandHoldingHeart,
  FaMicroscope,
  FaCut,
  FaLungs,
  FaTooth,
  FaCarrot,
  FaEye,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    image: "/general_medicine.webp",
    title: "General Medicine",
    description:
      "Expert primary healthcare for adults with personalized treatment plans. Comprehensive care for acute and chronic conditions with preventive health measures.",
    link: "general-medicine",
  },
  {
    id: 2,
    image: "/cardiology.avif",
    title: "Cardiology",
    description:
      "State-of-the-art cardiac care with advanced diagnostics and interventions. Specialized treatment for heart conditions using cutting-edge technology and evidence-based protocols.",
    link: "cardiology",
  },
  {
    id: 3,
    image: "/obstetrics_gynecology.jpg",
    title: "Obstetrics & Gynecology",
    description:
      "Comprehensive women's healthcare from pregnancy to specialized gynecological care. Dedicated support through every stage of a woman's life with personalized treatment approaches.",
    link: "obstetrics-gynecology",
  },
  {
    id: 4,
    image: "/Nephrology.jpg",
    title: "Nephrology",
    description:
      "Advanced kidney care with individualized treatment strategies. Expert management of chronic kidney disease and comprehensive dialysis services.",
    link: "nephrology",
  },
  {
    id: 5,
    image: "/Gastroenterology.jpg",
    title: "Gastroenterology",
    description:
      "Expert care for digestive system disorders with advanced endoscopic procedures. Comprehensive treatment for gastrointestinal conditions using modern therapeutic approaches.",
    link: "gastroenterology",
  },
  {
    id: 6,
    image: "/medical_ncology.jpg",
    title: "Medical Oncology",
    description:
      "Comprehensive cancer care with personalized treatment protocols. Advanced therapies combined with supportive care for optimal patient outcomes.",
    link: "medical-oncology",
  },
  {
    id: 7,
    image: "/radiology.avif",
    title: "Radiology",
    description:
      "High-precision imaging services with state-of-the-art equipment. Advanced diagnostic capabilities for accurate treatment planning and monitoring.",
    link: "radiology",
  },
  {
    id: 8,
    image: "/pediateritcs.jpg",
    title: "Pediatrics",
    description:
      "Specialized care for children from newborns to adolescents. Comprehensive pediatric services with a focus on growth, development, and preventive care.",
    link: "pediatrics",
  },
  {
    id: 9,
    image: "/orthopedic.jpg",
    title: "Orthopedic Specialist",
    description:
      "Advanced treatment for bone, joint, and musculoskeletal conditions. Specialized care ranging from sports injuries to complex joint replacements.",
    link: "orthopedics",
  },
  {
    id: 10,
    image: "/urology.webp",
    title: "Urology",
    description:
      "Expert care for urological conditions with minimally invasive approaches. Comprehensive treatment of urinary tract and reproductive system disorders.",
    link: "urology",
  },
];

const specializedServices = [
  {
    id: 1,
    icon: FaBrain,
    title: "Neurology",
    description:
      "Advanced neurological care for brain, spine, and nervous system disorders with cutting-edge diagnostic tools.",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 2,
    icon: FaHandPaper,
    title: "Hand Injury & Surgery",
    description:
      "Specialized treatment for hand injuries, microsurgery, and rehabilitation with precision techniques.",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: 3,
    icon: FaCamera,
    title: "Endoscopy",
    description:
      "Minimally invasive diagnostic and therapeutic procedures using advanced endoscopic technology.",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: 4,
    icon: FaSyringe,
    title: "Chemotherapy",
    description:
      "Comprehensive cancer treatment with personalized chemotherapy protocols and supportive care.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    id: 5,
    icon: FaBolt,
    title: "Skin Specialist",
    description:
      "Expert dermatological care for skin conditions, cosmetic treatments, and preventive skin health.",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: 6,
    icon: FaCamera,
    title: "Ultrasonography (USG)",
    description:
      "High-resolution imaging for accurate diagnosis with state-of-the-art ultrasound technology.",
    color: "from-teal-500 to-indigo-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: 7,
    icon: FaAppleAlt,
    title: "Homeopathy",
    description:
      "Natural healing approach with personalized homeopathic treatments for holistic wellness.",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 8,
    icon: FaBrain,
    title: "Psychology & Psychiatry",
    description:
      "Mental health support with comprehensive psychological evaluation and therapeutic interventions.",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: 9,
    icon: FaAmbulance,
    title: "ICU & Critical Care",
    description:
      "24/7 intensive care with advanced life support systems and expert critical care specialists.",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    id: 10,
    icon: FaHandHoldingHeart,
    title: "Physiotherapy",
    description:
      "Comprehensive rehabilitation services with personalized therapy plans for optimal recovery.",
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    id: 11,
    icon: FaMicroscope,
    title: "Pathology",
    description:
      "Accurate diagnostic testing with advanced laboratory services and rapid result delivery.",
    color: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  {
    id: 12,
    icon: FaCut,
    title: "General & Plastic Surgery",
    description:
      "Expert surgical procedures with minimally invasive techniques and aesthetic enhancements.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 13,
    icon: FaLungs,
    title: "Laparoscopy",
    description:
      "Advanced minimally invasive surgical procedures with faster recovery and precision.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    id: 14,
    icon: FaBolt,
    title: "Dental Care",
    description:
      "Comprehensive oral health services from preventive care to advanced dental procedures.",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: 15,
    icon: FaAppleAlt,
    title: "Dietician & Nutrition",
    description:
      "Personalized nutrition counseling and dietary planning for optimal health and wellness.",
    color: "from-lime-500 to-green-600",
    bgColor: "bg-lime-50",
    iconColor: "text-lime-600",
  },
  {
    id: 16,
    icon: FaEye,
    title: "Ophthalmology & Cataract",
    description:
      "Complete eye care services including advanced cataract surgery and vision correction.",
    color: "from-sky-500 to-teal-600",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllSpecialized, setShowAllSpecialized] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpecializedServices = specializedServices.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services-container min-h-screen bg-gray-50">
      {/* Hero Section */}{" "}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {" "}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-8 animate-bounce">
              <FaStethoscope className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
              Our Medical Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive healthcare solutions with cutting-edge technology
              and expert medical professionals
            </p>
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative group">
                {" "}
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for a service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-300 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Primary Medical Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core medical departments offering comprehensive healthcare
              solutions
            </p>
          </div>{" "}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {(isMobile
              ? showAllServices
                ? filteredServices
                : filteredServices.slice(0, 6)
              : filteredServices
            ).map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group service-card flex flex-col h-[400px] md:h-[500px] overflow-hidden transform hover:-translate-y-2"
              >
                {/* Fixed Image Container */}{" "}
                <div className="relative h-40 md:h-56 overflow-hidden rounded-t-2xl bg-gray-100 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Content Section */}{" "}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  {" "}
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {service.description}
                  </p>
                  {/* Learn More Button */}
                  <div className="mt-auto pt-4">
                    <Link
                      to={`/services/${service.link}`}
                      className="inline-flex items-center text-amber-500 font-medium group/link hover:text-amber-700 transition-colors duration-200"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2 transform transition-transform duration-200 group-hover/link:translate-x-1"
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
          {/* View All Services Button - Mobile Only */}
          {isMobile && filteredServices.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
                {showAllServices ? "Show Less" : "View All Services"}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAllServices ? "rotate-180" : ""
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
            </div>
          )}
        </div>
      </section>
      {/* Specialized Sub-Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-teal-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {" "}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Specialized Sub-Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive specialized care with expert medical professionals
              and state-of-the-art technology. Your health is our priority with
              personalized treatment approaches.
            </p>
          </div>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {(isMobile
              ? showAllSpecialized
                ? filteredSpecializedServices
                : filteredSpecializedServices.slice(0, 6)
              : filteredSpecializedServices
            ).map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`${service.bgColor} rounded-2xl p-3 md:p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer relative overflow-hidden transform hover:-translate-y-1 hover:scale-105`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent
                      className={`text-2xl ${service.iconColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {" "}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-gray-700 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                      {service.description}
                    </p>
                    {/* Hover Arrow */}
                    <div className="flex items-center text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                      <span className="text-xs font-medium">Learn more</span>
                      <svg
                        className="w-4 h-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
          {/* View All Specialized Services Button - Mobile Only */}
          {isMobile && filteredSpecializedServices.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllSpecialized(!showAllSpecialized)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
                {showAllSpecialized
                  ? "Show Less"
                  : "View All Specialized Services"}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAllSpecialized ? "rotate-180" : ""
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
            </div>
          )}
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-200">
                500+
              </div>
              <div className="text-gray-600 text-sm">Expert Doctors</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-200">
                50K+
              </div>
              <div className="text-gray-600 text-sm">Happy Patients</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-200">
                24/7
              </div>
              <div className="text-gray-600 text-sm">Emergency Care</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-200">
                15+
              </div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Strip */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {" "}
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-3xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-teal-200 to-teal-300 rounded-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <FaHospital className="mx-auto text-4xl text-teal-500 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Have any questions or need a consultation?
              </h3>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                Our medical experts are here to help. Get in touch with us for
                any medical queries or appointment scheduling.
              </p>
              <Link to="/contact">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:from-teal-600 hover:to-teal-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Us
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

export default ServicesPage;
