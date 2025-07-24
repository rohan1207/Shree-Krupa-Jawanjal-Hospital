import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiUserLine,
  RiTestTubeLine,
  RiFileListLine,
  RiShieldCrossLine,
  RiCalendarCheckLine,
  RiMenuLine,
  RiCloseLine,
  RiLogoutBoxLine,
  RiDownloadLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiEyeLine,
} from "react-icons/ri";
import AdvantagesSlider from "../components/AdvantagesSlider";
import MedicalDocuments from "../components/MedicalDocuments";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    // Check if user is authenticated and is a patient
    if (!token || userType !== "patient") {
      navigate("/login");
      return;
    }

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData({
          name: parsedUserData.name || "",
          phone: parsedUserData.phone || "",
          address: parsedUserData.address || "",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        // If there's an error parsing user data, redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        navigate("/login");
      }
    } else {
      // If no user data found, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const menuItems = [
    { id: "profile", icon: RiUserLine, label: "Profile" },
    { id: "bookTest", icon: RiTestTubeLine, label: "Book Test" },
    { id: "reports", icon: RiFileListLine, label: "Reports" },
    { id: "insurance", icon: RiShieldCrossLine, label: "Insurance" },
    {
      id: "appointments",
      icon: RiCalendarCheckLine,
      label: " Book Appointments",
    },
  ];

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Helper function to get user initials
  const getUserInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 h-screen
          w-full sm:w-80 lg:w-64
          bg-white shadow-xl lg:shadow-lg
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          z-30
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 lg:hidden"
        >
          <RiCloseLine size={24} className="text-gray-600" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Shri Krupa Jawanjal Hospital" className="h-10" />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex-shrink-0 p-6 border-b border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-semibold">
                {getUserInitials(userData.name)}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {userData.name || "Loading..."}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{userData.phone}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 text-left
                ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <RiLogoutBoxLine size={20} />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>{" "}
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between flex-shrink-0 relative z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <RiMenuLine size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="w-10 h-10"></div> {/* Spacer for centering */}
        </header>
        {/* Content Area */}{" "}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
          <DashboardContent activeTab={activeTab} userData={userData} />
        </div>
      </main>
    </div>
  );
};

// Dynamic Dashboard Content Component
const DashboardContent = ({ activeTab, userData }) => {
  const contentComponents = {
    profile: <ProfileSection userData={userData} />,
    bookTest: <BookTestSection />,
    reports: <ReportsSection />,
    insurance: <InsuranceSection />,
    appointments: <AppointmentSection />,
  };

  return contentComponents[activeTab] || <div>Select a menu item</div>;
};

// Individual Section Components
const ProfileSection = ({ userData }) => {
  const getUserInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-4xl font-semibold">
              {getUserInitials(userData.name)}
            </span>
          </div>
          <div className="flex-1 space-y-6 text-center sm:text-left">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Full Name
              </label>
              <p className="text-xl font-semibold text-gray-900 mt-1">
                {userData.name || "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Phone Number
              </label>
              <p className="text-lg text-gray-700 mt-1">
                {userData.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Address
              </label>
              <p className="text-lg text-gray-700 mt-1">
                {userData.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add AdvantagesSlider */}
      <AdvantagesSlider />
    </div>
  );
};

const BookTestSection = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    address: "",
    visitTime: "",
    date: "",
  });

  const tests = [
    {
      name: "Complete Blood Count",
      description:
        "Includes hemoglobin, WBC, RBC, platelets and other parameters",
      price: "₹450",
    },
    {
      name: "Diabetes Profile",
      description: "Blood sugar (fasting & PP), HbA1c test",
      price: "₹800",
    },
    {
      name: "Lipid Profile",
      description: "Cholesterol, triglycerides, HDL, LDL testing",
      price: "₹600",
    },
    {
      name: "Thyroid Profile",
      description: "T3, T4, TSH level analysis",
      price: "₹850",
    },
    {
      name: "Liver Function Test",
      description: "Complete liver profile including SGPT, SGOT",
      price: "₹900",
    },
    {
      name: "Kidney Function Test",
      description: "Creatinine, urea, uric acid analysis",
      price: "₹750",
    },
  ];

  const handleBookNow = (test) => {
    setSelectedTest(test);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the booking
    alert("Test booking submitted successfully!");
    setShowBookingForm(false);
    setBookingForm({
      name: "",
      phone: "",
      address: "",
      visitTime: "",
      date: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Test</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tests.map((test) => (
          <div
            key={test.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {test.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {test.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-600 font-semibold text-lg">
                {test.price}
              </span>
            </div>
            <button
              onClick={() => handleBookNow(test)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Book {selectedTest?.name}
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your full name"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your address"
                    rows="3"
                    value={bookingForm.address}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={bookingForm.date}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={bookingForm.visitTime}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          visitTime: e.target.value,
                        })
                      }
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount:</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {selectedTest?.price}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportsSection = () => {
  const [expandedReport, setExpandedReport] = useState(null);

  const reports = [
    {
      id: 1,
      name: "Blood Test Report",
      date: "2025-06-10",
      status: "Ready",
      details:
        "Complete blood count showing normal values for hemoglobin, white blood cells, and platelets. No abnormalities detected.",
    },
    {
      id: 2,
      name: "X-Ray Report",
      date: "2025-06-08",
      status: "Processing",
      details:
        "Chest X-ray examination is currently being reviewed by our radiologist. Results will be available within 2-3 business days.",
    },
    {
      id: 3,
      name: "General Checkup",
      date: "2025-06-05",
      status: "Ready",
      details:
        "Annual health checkup including vital signs, basic metabolic panel, and physical examination. Overall health status is good with minor recommendations for lifestyle improvements.",
    },
  ];

  const toggleExpanded = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reports</h2>

      {/* Recent Reports */}
      <div className="space-y-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {report.date}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.status === "Ready"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {report.status}
                  </span>
                  {report.status === "Ready" && (
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
                      <RiDownloadLine size={16} />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Expandable Details */}
              <div className="mt-4">
                <button
                  onClick={() => toggleExpanded(report.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span className="text-sm font-medium">
                    {expandedReport === report.id ? "Show Less" : "Read More"}
                  </span>
                  {expandedReport === report.id ? (
                    <RiArrowUpSLine size={18} />
                  ) : (
                    <RiArrowDownSLine size={18} />
                  )}
                </button>

                {expandedReport === report.id && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {report.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Your Medical Documents Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Medical Documents
          </h3>
          <MedicalDocuments />
        </div>
      </div>
    </div>
  );
};

const InsuranceSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
    familyMembers: "",
  });

  const insurances = [
    {
      name: "PMC PMT Workers Insurance",
      description:
        "Comprehensive coverage for PMC PMT workers and their families",
    },
    {
      name: "Maharashtra Police Kutumb Kalyan Yojana",
      description: "Special insurance scheme for Maharashtra Police personnel",
    },
    {
      name: "Dhanwantari Yojana for PCMC workers",
      description: "Healthcare coverage for PCMC employees",
    },
    {
      name: "Maharashtra Government Employee Insurance",
      description: "Insurance coverage for state government employees",
    },
    {
      name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
      description: "Health coverage for economically disadvantaged families",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert(
      "Thank you for your interest. Our Insurance Member will reach you soon."
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Plans</h2>

      {/* Available Insurance Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {insurances.map((insurance, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {insurance.name}
            </h3>
            <p className="text-gray-600 text-sm">{insurance.description}</p>
          </div>
        ))}
      </div>

      {/* Enquiry Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">
          Insurance Enquiry Form
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your occupation"
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Family Members
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter number of family members"
                value={formData.familyMembers}
                onChange={(e) =>
                  setFormData({ ...formData, familyMembers: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AppointmentSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    reason: "",
    previousVisit: "no",
    preferredDate: "",
    preferredTime: "",
  });

  const doctors = [
    {
      name: "Dr. Sandeep J. Jawanjal",
      speciality: "Cardiologist",
      nextSlot: "Today, 4:00 PM",
      rating: "4.8",
      image: "/hero3.jpg",
      description:
        "MBBS, MD (Cardiology), 15+ years of experience in treating complex cardiac conditions. Special interest in interventional cardiology.",
    },
    {
      name: "Dr. Sumeet Jagtap",
      speciality: "Orthopedic",
      nextSlot: "Tomorrow, 10:00 AM",
      rating: "4.9",
      image: "/sumeet_jagtap.jpeg",
      description:
        "MBBS, MS (Ortho), Specializes in joint replacement surgery and sports injuries. Over 12 years of surgical experience.",
    },
    {
      name: "Dr. Pallavi Jagtap",
      speciality: "Gynecologist",
      nextSlot: "Tomorrow, 2:00 PM",
      rating: "4.7",
      image: "/pallavi.jpeg",
      description:
        "MBBS, MD (Obstetrics & Gynecology), Expert in high-risk pregnancies and minimally invasive surgeries. 10+ years experience.",
    },
    {
      name: "Dr. Jitendra Jagtap",
      speciality: "Dermatologist",
      nextSlot: "June 16, 11:00 AM",
      rating: "4.6",
      image: "/jj.jpeg",
      description:
        "MBBS, MD (Dermatology), Specialized in cosmetic dermatology and skin disorders. Advanced training in laser treatments.",
    },
  ];

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the appointment
    alert(
      "Appointment booked successfully! Our team will confirm your appointment shortly."
    );
    setShowBookingForm(false);
    setBookingForm({
      name: "",
      phone: "",
      age: "",
      gender: "",
      reason: "",
      previousVisit: "no",
      preferredDate: "",
      preferredTime: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book Appointment
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {doctor.name}
                  </h3>
                  <p className="text-orange-600 font-medium mt-1">
                    {doctor.speciality}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1 font-medium">
                        {doctor.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">
                      Next Available: {doctor.nextSlot}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed border-t pt-4">
                {doctor.description}
              </p>
            </div>
            <button
              onClick={() => handleBookNow(doctor)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium mt-4"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Appointment Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Book Appointment
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    with {selectedDoctor?.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your full name"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="120"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your age"
                      value={bookingForm.age}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={bookingForm.gender}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Brief description of your health concern"
                    rows="3"
                    value={bookingForm.reason}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, reason: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is this your first visit?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="previousVisit"
                        value="yes"
                        checked={bookingForm.previousVisit === "yes"}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            previousVisit: e.target.value,
                          })
                        }
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500"
                        name="previousVisit"
                        value="no"
                        checked={bookingForm.previousVisit === "no"}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            previousVisit: e.target.value,
                          })
                        }
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={bookingForm.preferredDate}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          preferredDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={bookingForm.preferredTime}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          preferredTime: e.target.value,
                        })
                      }
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Appointment with:</p>
                    <p className="font-semibold text-gray-900">
                      {selectedDoctor?.name}
                    </p>
                    <p className="text-sm text-orange-600">
                      {selectedDoctor?.speciality}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
