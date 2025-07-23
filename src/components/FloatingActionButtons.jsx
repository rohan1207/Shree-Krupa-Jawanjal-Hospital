import React, { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFirstAid,
  FaCommentDots,
} from "react-icons/fa";
import ChatBot from "./ChatBot";

const FloatingActionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const phoneNumber = "8855817434";
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const telLink = `tel:${phoneNumber}`;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp and Emergency buttons that appear when toggled */}
        <div
          className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-3 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={28} />
          </a>
          <a
            href={telLink}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:from-teal-600 hover:to-teal-700 transition-transform transform hover:scale-110"
            aria-label="Emergency Call"
          >
            <FaPhoneAlt size={24} />
          </a>
          <button
            onClick={() => {
              setIsChatOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-14 h-14 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-110"
            aria-label="Open Chatbot"
          >
            <FaCommentDots size={28} />
          </button>
        </div>

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-110 active:scale-95 hover:from-teal-600 hover:to-teal-700"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        >
          <FaFirstAid
            size={24}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        className="onHover:aria-label='Shri Krupa Jawanjal Hospital Assistant'"
      />
    </>
  );
};

export default FloatingActionButtons;
