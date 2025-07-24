import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  ArrowRight,
  Clock,
  Calendar,
} from "lucide-react";

const Contact = () => {
  const [contactMethod, setContactMethod] = useState("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactMethod === "whatsapp") {
      const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
      window.open(`https://wa.me/918048060580?text=${message}`, "_blank");
    } else {
      // Handle email submission
      window.location.href = `mailto:info@Shri Krupa Jawanjalhospital.com?subject=Contact Inquiry from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AMessage: ${formData.message}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Map Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/10 to-transparent z-10"></div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.9225866110564!2d76.2583854750119!3d20.34481648113887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bda10059da067bb%3A0xb49850c6a6f8a42c!2sShri%20Krupa%20Jawanjal%20Hospital%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1753341110703!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="filter grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Phone,
              title: "Phone",
              content: "+1 (123) 456-7890",
              link: "tel:+11234567890",
              color: "from-teal-500 to-teal-600",
            },
            {
              icon: Mail,
              title: "Email",
              content: "info@Shri Krupa Jawanjalhospital.com",
              link: "mailto:info@Shri Krupa Jawanjalhospital.com",
              color: "from-teal-400 to-teal-500",
            },
            {
              icon: MapPin,
              title: "Location",
              content: "Shree Krupa Jawanjal Hospital, Chikhli, India",
              link: "https://maps.app.goo.gl/ALpqVHobJGy1HeJ16",
              color: "from-teal-500 to-teal-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <a
                href={item.link}
                className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
              >
                {item.content}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 sm:p-12"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our services or want to schedule an
                appointment? Reach out to us and we'll get back to you as soon
                as possible.
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setContactMethod("email")}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  contactMethod === "email"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
              <button
                onClick={() => setContactMethod("whatsapp")}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  contactMethod === "whatsapp"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`px-8 py-4 rounded-full font-semibold text-white flex items-center gap-2 mx-auto ${
                    contactMethod === "whatsapp"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-teal-500 hover:bg-teal-600"
                  } transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Working Hours Strip */}
        <div className="mb-20 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hospital Hours
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">
                    Monday - Saturday: 9:00 AM - 9:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">
                    Sunday: 10:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Emergency Services
              </h4>
              <p className="text-gray-600 mb-4">
                Available 24/7 for emergency cases
              </p>
              <a
                href="tel:08048060580"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Emergency Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
