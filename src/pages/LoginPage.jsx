import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("admin");
  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      if (!token || !userType) return;

      try {
        // Try to validate the token
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Token is valid, redirect based on user type
          if (userType === "patient") {
            navigate("/patient-dashboard");
          } else if (userType === "admin") {
            navigate("/admin-dashboard");
          }
        } else {
          // Clear invalid auth data
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          localStorage.removeItem("userData");
        }
      } catch (error) {
        // Clear invalid auth data
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        console.error("Auth validation error:", error);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Admin login state
  const [adminData, setAdminData] = useState({
    adminId: "",
    password: "",
  });

  // Patient login state
  const [patientData, setPatientData] = useState({
    phone: "",
    password: "",
  });

  // Patient signup state
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin/login`,
        adminData
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Sending login request with data:", {
        phone: patientData.phone,
        passwordLength: patientData.password.length,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/patient/login`,
        {
          phone: patientData.phone.trim(),
          password: patientData.password,
        }
      );

      console.log("Server response:", response.data);

      if (response.data.success && response.data.token) {
        // Store the auth data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "patient");
        localStorage.setItem("userData", JSON.stringify(response.data.data));

        // Set up axios defaults
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        console.log("Login successful, navigating to dashboard...");
        navigate("/patient-dashboard", { replace: true });
      } else {
        console.log("Invalid response format:", response.data);
        setError("Login failed. Invalid response from server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        setError(
          error.response.data?.message ||
            "Login failed. Please check your credentials."
        );
      } else if (error.request) {
        console.error("No response received from server");
        setError("Unable to connect to the server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/patient/register`,
        signupData
      );
      if (response.data.success) {
        alert("Registration successful! Please login.");
        setShowSignup(false);
        setPatientData({ ...patientData, phone: signupData.phone });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(/operation1.avif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Back to Home button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center px-3 py-2 rounded-lg bg-white/80 hover:bg-teal-600 hover:text-white text-teal-600 shadow transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 sm:top-6 sm:left-6 z-20"
        style={{ minWidth: 0 }}
        aria-label="Back to Home"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden xs:inline-block text-sm font-semibold">
          Back to Home
        </span>
      </button>
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Shri Krupa Jawanjal Hospital"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">
            Access your healthcare account
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Type Tabs */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => {
              setActiveTab("admin");
              setError("");
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "admin"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Doctor Login
          </button>
          <button
            onClick={() => {
              setActiveTab("patient");
              setError("");
            }}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "patient"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Patient Login
          </button>
        </div>

        {/* Admin Login Form */}
        {activeTab === "admin" && !showSignup && (
          <form onSubmit={handleAdminLogin} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="adminId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin ID
                </label>
                <input
                  id="adminId"
                  name="adminId"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                  placeholder="Enter your admin ID"
                  value={adminData.adminId}
                  onChange={(e) =>
                    setAdminData({ ...adminData, adminId: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="adminPassword"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                  placeholder="Enter your password"
                  value={adminData.password}
                  onChange={(e) =>
                    setAdminData({ ...adminData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        )}

        {/* Patient Login/Signup Forms */}
        {activeTab === "patient" && (
          <div className="mt-8">
            {!showSignup ? (
              <form onSubmit={handlePatientLogin} className="space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Enter your phone number"
                      value={patientData.phone}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Enter your password"
                      value={patientData.password}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                      isLoading
                        ? "bg-teal-400"
                        : "bg-teal-600 hover:bg-teal-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600`}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <div className="text-sm text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignup(true);
                      setError("");
                    }}
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    New patient? Register here
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePatientSignup} className="space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label
                      htmlFor="signupName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="signupName"
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Enter your full name"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signupPhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="signupPhone"
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Enter your phone number"
                      value={signupData.phone}
                      onChange={(e) =>
                        setSignupData({ ...signupData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signupAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="signupAddress"
                      name="address"
                      required
                      rows={3}
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Enter your address"
                      value={signupData.address}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signupPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="signupPassword"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-600 focus:border-teal-600"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                      isLoading
                        ? "bg-teal-400"
                        : "bg-teal-600 hover:bg-teal-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>

                <div className="text-sm text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignup(false);
                      setError("");
                    }}
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    Already have an account? Login here
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
