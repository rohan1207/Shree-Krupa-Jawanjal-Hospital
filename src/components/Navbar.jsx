import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX, HiPhone, HiClock } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Doctors", link: "/doctors" },
    { title: "Our Gallery", link: "/gallery" },
    { title: "Blogs & Events", link: "/blog" },
    { title: "Contact Us", link: "/contact" },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed w-full z-50 px-4 py-1 transition-all duration-300">
        <div
          className={`mx-auto max-w-7xl min-h-[60px] bg-white/95 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 ${
            scrolled ? "shadow-lg" : "shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center"
                >
                  <img
                    src="/logo.png"
                    alt="Hospital Logo"
                    className="h-12 sm:h-14 w-auto object-contain max-w-[180px] sm:max-w-[200px]"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.link}
                      className="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-200 rounded-full hover:bg-amber-50"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link to="/login">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block ml-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                    >
                      Login
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className={`lg:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-50 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="min-h-screen flex flex-col h-[100dvh]">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-3">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Hospital Logo"
                  className="h-8 w-auto"
                />
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <HiX size={24} />
              </motion.button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <motion.div key={item.title} whileHover={{ x: 5 }}>
                    <Link
                      to={item.link}
                      className="block px-6 py-2.5 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-full font-medium transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Footer - Fixed at bottom */}
            <div className="px-6 py-4 space-y-2 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
              <Link to="/doctors">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-amber-50 text-amber-600 px-6 py-2.5 rounded-full font-medium transition-all duration-200 text-center hover:bg-amber-100"
                >
                  Find a Doctor
                </motion.div>
              </Link>
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-600 text-center transition-all duration-200"
                >
                  Login
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
