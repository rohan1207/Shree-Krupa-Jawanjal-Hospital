import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUserMd, FaClock } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    message: "",
  });

  const departments = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Anesthesiology",
    "Dermatology",
    "Homeopathy",
    "Physiotherapy",
    "Radiology",
    "Chest Medicine",
    "Spine Surgery",
    "Neurosurgery",
    "Vascular Surgery",
    "Faciomaxillary Surgery",
    "Hand Surgery",
    "Plastic Surgery",
    "Rheumatology",
    "Sports Medicine",
    "Chemotherapy",
    "Dietetics",
    "Laparoscopic Surgery",
    "Ophthalmology",
    "ENT Surgery",
    "General Surgery",
    "Urology",
    "Endoscopy",
    "Psychiatry",
    "Dentistry",
    "Internal Medicine",
    "Obstetrics & Gynecology",
  ];

  const doctors = {
    "General Medicine": [
      "Dr. Vaibhav Lotake",
      "Dr. Vrushali Wagh",
      "Dr. Sumeet Jagtap",
    ],
    Cardiology: ["Dr. Rajesh Wagh", "Dr. Hasmukh Gujar"],
    Neurology: ["Dr. Nilesh Palasdeokar", "Dr. Suyog Doshi"],
    Orthopedics: [
      "Dr. Ganesh Jagdale",
      "Dr. Shivraj Konde",
      "Dr. Abhishek Mahajan",
    ],
    Pediatrics: ["Dr. Ashwin Borade"],
    Gynecology: ["Dr. Shruti Palasdeokar"],
    Anesthesiology: [
      "Dr. Sachin Ghodaki",
      "Dr. Abhay Sancheti",
      "Dr. Abhishchandra Dupargude",
      "Dr. Manoj Gajbhare",
      "Dr. Mugdha Mahajan",
      "Dr. Rohini Khatpe",
    ],
    Dermatology: ["Dr. Satyawan Choure"],
    Homeopathy: ["Dr. Vikas Khatpe", "Dr. Sunil Jagtap"],
    Physiotherapy: ["Dr. Pooja Durve", "Dr. Hemant Welkar"],
    Radiology: ["Dr. Saurabh Chaudhuri"],
    "Chest Medicine": ["Dr. Suhas Kulkarni"],
    "Spine Surgery": ["Dr. Abhijeet Pawar", "Dr. Sanjay Patil"],
    Neurosurgery: ["Dr. Sanjay Pawar", "Dr. Vishal Rokade"],
    "Vascular Surgery": ["Dr. Shardul Date"],
    "Faciomaxillary Surgery": [
      "Dr. Janardan Garade",
      "Dr. Vikramsingh Deshmukh",
    ],
    "Hand Surgery": ["Dr. Pankaj Jindal"],
    "Plastic Surgery": ["Dr. Pushkar Deshpande"],
    Rheumatology: ["Dr. Nilesh Patil"],
    "Sports Medicine": ["Dr. Sudhanshu Takawale"],
    Chemotherapy: ["Dr. Chetan Deshmukh"],
    Dietetics: ["Dr. Dipti Khedkar"],
    "Laparoscopic Surgery": [
      "Dr. Mahesh Sinnarkar",
      "Dr. Kunal Oswal",
      "Dr. Ashish Kale",
    ],
    Ophthalmology: ["Dr. Varsha Nerlekar", "Dr. Amol Chavan"],
    "ENT Surgery": ["Dr. Prakash Patil", "Dr. Alkesh Oswal"],
    "General Surgery": ["Dr. Sachin Deshpande"],
    Urology: ["Dr. Suraj Lunawat", "Dr. Satyen Dobhada"],
    Endoscopy: ["Dr. Viraj Shinde"],
    Psychiatry: ["Dr. Dnyanraj Choudhary", "Dr. Prakash Bhambure"],
    Dentistry: ["Dr. Prasad Kulkarni"],
    "Internal Medicine": ["Dr. Sumeet Jagtap"],
    "Obstetrics & Gynecology": ["Dr. Pallavi Jagtap"],
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/appointments`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        doctor: formData.doctor,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        message: formData.message,
      });

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Appointment booked successfully. Thank you!",
          // Update confirmation button color
          confirmButtonColor: "#3b82f6",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          department: "",
          doctor: "",
          message: "",
        });
        setStep(1);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const nextStep = () => {
    let isValid = false;
    if (step === 1) {
      if (formData.name && formData.email && formData.phone) {
        isValid = true;
      }
    } else if (step === 2) {
      if (formData.department && formData.doctor) {
        isValid = true;
      }
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 3));
    } else {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill out all fields in the current step to continue.",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-24 pb-12 px-4"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Book Your Appointment
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600"
        >
          Schedule a consultation with our expert doctors
        </motion.p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= item
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {item}
              </div>
              {item < 3 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step > item ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              {" "}
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUserMd className="text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Department & Doctor Selection */}
          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUserMd className="text-blue-600" />
                Select Department & Doctor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      required
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white cursor-pointer"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept} className="py-3 px-4">
                          {dept}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <div className="relative">
                    <select
                      required
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500 cursor-pointer"
                      disabled={!formData.department}
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                      }}
                    >
                      <option value="">Select Doctor</option>
                      {formData.department &&
                        doctors[formData.department].map((doc) => (
                          <option key={doc} value={doc} className="py-3 px-4">
                            {doc}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <style jsx>{`
                select {
                  max-height: 300px;
                }

                select option {
                  padding: 12px;
                  background-color: white;
                }

                select option:hover,
                select option:focus {
                  background-color: #f8f9fa;
                }

                @media (max-width: 768px) {
                  select {
                    max-height: 250px;
                  }
                }

                /* Force select to open downwards */
                select:focus {
                  position: relative;
                  z-index: 1000;
                }

                select:focus option {
                  position: relative;
                  z-index: 1001;
                }
              `}</style>
            </motion.div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Select Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    required
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Any additional information for the doctor..."
                  ></textarea>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={prevStep}
              className={`px-6 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors ${
                step === 1 ? "invisible" : ""
              }`}
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type={step === 3 ? "submit" : "button"}
              onClick={step < 3 ? nextStep : undefined}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {step === 3 ? "Book Appointment" : "Next"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
