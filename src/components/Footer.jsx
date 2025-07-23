import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Clock,
} from "lucide-react";

const Footer = () => {
  const openingHours = [
    { day: "Mon - Sat", time: "09:00 AM – 09:30 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {" "}
        {/* Logo & About */}
        <div className="flex flex-col items-center space-y-6 md:items-start">
          <img
            src="/logo.png"
            alt="Shri Krupa Jawanjal Logo"
            className="h-24 md:h-28 object-contain"
          />
          <p className="leading-relaxed text-gray-400 text-center md:text-left max-w-sm">
            Shri Krupa Jawanjal provides world-class healthcare services with experience,
            expertise, and dedication focused on your well-being.
          </p>
          <div className="flex justify-center space-x-6 mt-2">
            <a
              href="https://www.facebook.com/Shri Krupa Jawanjalhospital/"
              className="hover:text-teal-500 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://x.com/intent/post?text=Check%20out%20&url=https%3A%2F%2Fwww.Shri Krupa Jawanjalhospital.com"
              className="hover:text-teal-500 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.youtube.com/watch?v=dtBqw8ICgDo"
              className="hover:text-teal-500 transition"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://www.linkedin.com/cws/share?url=https://www.Shri Krupa Jawanjalhospital.com"
              className="hover:text-teal-500 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>{" "}
        {/* Links */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          <div className="flex flex-col items-center">
            <h3 className="text-white font-semibold mb-4 text-center">
              Quick Links
            </h3>
            <div className="flex flex-col items-center space-y-3 text-gray-400">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Doctors", href: "/doctors" },
                { label: "Services", href: "/services" },
                { label: "Stories", href: "/" },
                { label: "News", href: "/blog" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-teal-500 transition text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-white font-semibold mb-4 text-center">
              Our Services
            </h3>
            <div className="flex flex-col items-center space-y-3 text-gray-400">
              {[
                "General Medicine",
                "Cardiology",
                "Neurology",
                "Orthopedics",
                "Emergency Care",
                "Diagnostics",
              ].map((service) => (
                <a
                  key={service}
                  href="/services"
                  className="hover:text-teal-500 transition text-center"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>
        </div>{" "}
        {/* Contact & Timing */}
        <div className="flex flex-col  space-y-8  text-left md:text-left align-left">
          <div className="flex flex-col  w-full max-w-xs">
            <h3 className="text-white font-semibold mb-4 flex  gap-2">
              <Clock size={16} className="text-teal-500" />
              Opening Hours
            </h3>
            <ul className="flex flex-col  space-y-2 text-gray-400 ">
              {openingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex  gap-2 "
                >
                  <span className="font-medium text-white">
                    {item.day}:
                  </span>
                  <span className="text-left">{item.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-teal-400 font-medium">
              <Phone size={14} className="inline mr-1" /> Emergency: 24x7
            </p>
          </div>

          <div className="flex flex-col  space-y-4 text-gray-400 w-full max-w-xs">
            <div className="flex items-start  gap-2">
              <MapPin size={16} className="text-teal-500 mt-1 shrink-0" />
              <span className="" href="">
                Chikhli-Satara Road, opp. PMT Bus Depot, Chikhli Chikhli, Maharashtra,
                India 411046
              </span>
            </div>
            <div className="flex items-center  gap-2">
              <Phone size={16} className="text-teal-500 shrink-0" />
              <a
                href="tel:+918048060580"
                className="hover:text-teal-500 transition"
              >
                +91 8048060580
              </a>
            </div>
            <div className="flex  gap-2">
              <Mail size={16} className="text-teal-500 shrink-0" />
              <a
                href="mailto:info@Shri Krupa Jawanjalhospital.com"
                className="hover:text-teal-500 transition"
              >
                info@Shri Krupa Jawanjalhospital.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Shri Krupa Jawanjal Hospital. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
