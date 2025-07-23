import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { MessageCircle, X, Send } from "lucide-react";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your Shri Krupa Jawanjal Hospital assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage = { type: "bot", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessage = {
        type: "bot",
        content:
          "Sorry, I am having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-20 right-2 sm:right-6 w-[90vw] sm:w-96 h-[70vh] sm:h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border max-w-[100vw-1rem]">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 sm:p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                Shri Krupa Jawanjal Hospital Assistant
              </h3>
              <p className="text-[10px] sm:text-xs text-teal-100">
                Get quick answers to your health queries
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-teal-200 transition-colors"
            >
              <X size={18} sm:size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-2.5 sm:p-3 whitespace-pre-line text-sm sm:text-base ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-2.5 sm:p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 sm:p-4">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your health-related question..."
                className="flex-1 resize-none border rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:border-teal-500 max-h-32"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
              Press Enter to send. For emergencies, please call emergency
              services immediately.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
