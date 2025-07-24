import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlinePhone,
  HiOutlineHeart,
} from "react-icons/hi";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleEmergencyCall = () => {
    window.location.href = "tel:8008280020";
  };

  const hospitalImages = [
   "/hero1.png",
   "/hero2.png",
   "/hero3.jpg",
   "/hero4.jpg",

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === hospitalImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative pt-20 lg:pt-40 pb-24 lg:pb-20 bg-gradient-to-b from-amber-50 to-white overflow-hidden" style={{
      '--tw-rotate': '360deg',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8 transition-all duration-500 ease-out order-2 lg:order-1">
            <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 bg-amber-100/80 text-amber-600 rounded-full text-xs sm:text-sm font-medium transition-all duration-300">
                <HiOutlineHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Best Multispecialty Hospital in Chikhli
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-300">
                Your Health Is Our{" "}
                <span className="text-amber-600">Top Priority</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-300">
                Providing world-class healthcare with a compassionate touch. Our
                team of expert doctors and state-of-the-art facilities ensure
                you receive the best medical care possible.
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 transition-all duration-300">
              <Link
                to="/book-appointment"
                className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <HiOutlineCalendar className="h-5 w-5 sm:h-6 sm:w-6" />
                Book Appointment
              </Link>
              <a
                href="tel:8008280020"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                onClick={(e) => {
                  if (!/mobile|android|iphone/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    handleEmergencyCall();
                  }
                }}
              >
                <HiOutlinePhone className="h-5 w-5 sm:h-6 sm:w-6" />
                Emergency Call
              </a>
            </div>{" "}
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 lg:pt-8 transition-all duration-300">
              <div className="text-center p-2 sm:p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-amber-600">
                  15+
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  Years of Excellence
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-amber-600">
                  100+
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  Expert Doctors
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-amber-600">
                  50k+
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  Happy Patients
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Circular Image Frame */}
          <div className="relative order-1 lg:order-2 transition-all duration-500 ease-out">
            <div className="relative z-10 mx-auto w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px]">
              {/* Rotating Dotted Border */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/30 animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/20 animate-[spin_30s_linear_infinite_reverse]" />
              
              {/* Main Circle with Gradient Border */}
              <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  {/* Image Slider */}
                  <div
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  >
                    {hospitalImages.map((image, index) => (
                      <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          opacity: currentImageIndex === index ? 1 : 0,
                        }}
                      >
                        <img
                          src={image}
                          alt={`Hospital view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Minimal Floating Support Card */}
              <div className="absolute -bottom-3 sm:-bottom-4 right-0 sm:right-4 w-max bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm border border-amber-100">
                <HiOutlineUserGroup className="w-4 h-4 text-amber-600" />
                <span className="text-amber-900 font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-amber-400/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-16 w-40 h-40 sm:w-64 sm:h-64 bg-amber-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-16 w-40 h-40 sm:w-64 sm:h-64 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Hero;
