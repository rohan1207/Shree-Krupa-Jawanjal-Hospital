import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Doctors from "../components/Doctors";
import PatientStories from "../components/PatientStories";
import NewsEvents from "../components/NewsEvents";
import ChatBot from "../components/ChatBot";
import ExpertKnowledgeStrip from "../components/ExpertKnowledgeStrip";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <Hero />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <ExpertKnowledgeStrip />
      <PatientStories />
      <NewsEvents />
      {/* Contact Strip */}
      <div className="mt-8 sm:mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F04E30' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Have any questions or need a consultation?
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
            Our medical experts are here to help. Get in touch with us for any
            medical queries or appointment scheduling.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-teal-600 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
      <ChatBot />
    </motion.div>
  );
};

export default Home;
