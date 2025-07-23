import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Toaster, toast } from "react-hot-toast";
import {
  RiCalendarCheckLine,
  RiNewspaperLine,
  RiShieldUserLine,
  RiMenuLine,
  RiCloseLine,
  RiLogoutBoxLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiUserSettingsLine,
  RiUserAddLine,
} from "react-icons/ri";
import Modal from "../components/Modal";
import AddNewsForm from "../components/admin/AddNewsForm";

function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: "appointments", icon: RiCalendarCheckLine, label: "Appointments" },
    { id: "manageNews", icon: RiNewspaperLine, label: "News & Events" },
    { id: "manageAccess", icon: RiShieldUserLine, label: "User Access" },
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUserData(response.data.data);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex bg-gray-50">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed lg:sticky top-0 h-screen w-full sm:w-80 lg:w-72 bg-white flex flex-col transform transition-transform duration-300 ease-in-out z-30 border-r border-gray-100 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 lg:hidden"
          >
            <RiCloseLine size={24} className="text-gray-600" />
          </button>

          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Shri Krupa Jawanjal Hospital" className="h-10" />
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {userData?.name?.split(" ")[1]?.charAt(0) ||
                      userData?.name?.charAt(0) ||
                      "A"}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {userData?.name || ""}
                </h3>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 text-left ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium"
            >
              <RiLogoutBoxLine size={20} />
              <span className="ml-3">Sign Out</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <RiMenuLine size={24} className="text-gray-600" />
            </button>
            <img src="/logo.png" alt="Shri Krupa Jawanjal Hospital" className="h-8" />
            <div className="w-10"></div>
          </header>
          <div className="flex-1 p-4 lg:p-8 bg-gray-50">
            <DashboardContent activeTab={activeTab} userData={userData} />
          </div>
        </main>
      </div>
    </>
  );
}

const DashboardContent = ({ activeTab, userData }) => {
  const contentComponents = {
    appointments: <AppointmentsSection userData={userData} />,
    manageNews: <ManageNewsSection />,
    manageAccess: <ManageAccessSection />,
  };

  return contentComponents[activeTab] || <div>Select a menu item</div>;
};

const AppointmentsSection = () => {
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/appointments`);
        setAppointments(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const toggleExpanded = (appointmentId) => {
    setExpandedAppointment(
      expandedAppointment === appointmentId ? null : appointmentId
    );
  };

  const handleManageClick = (appointment) => {
    setSelectedAppointment(appointment);
    setManageModalOpen(true);
  };

  const handleCloseModal = () => {
    setManageModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleUpdateStatus = async (appointmentId) => {
    // Temporarily simulate API call
    try {
      // **TODO**: Replace with actual API call
      // const token = localStorage.getItem("token");

      //   { status: 'completed' },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      setAppointments(
        appointments.map((app) =>
          app._id === appointmentId ? { ...app, status: "completed" } : app
        )
      );
      toast.success("Appointment marked as completed!");
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        {" "}
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            <p className="font-medium mb-2">Error Loading Appointments</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Appointments</h2>
          <p className="text-sm text-gray-500 mt-1">
            {appointments.length === 0
              ? "No appointments found"
              : `Managing ${appointments.length} appointment${
                  appointments.length === 1 ? "" : "s"
                }`}
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <RiAddLine className="mr-2" size={18} />
          Schedule New
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-700 font-medium">
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">
                        {appointment.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.phone}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : appointment.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {appointment.status
                      ? appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)
                      : "New"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">
                      {appointment.appointmentTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium text-gray-900">
                      {appointment.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Doctor</p>
                    <p className="font-medium text-gray-900">
                      {appointment.doctor}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 -mx-6 px-6 py-4">
                  <button
                    onClick={() => toggleExpanded(appointment._id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {expandedAppointment === appointment._id
                        ? "Hide Details"
                        : "View Details"}
                    </span>
                    {expandedAppointment === appointment._id ? (
                      <RiArrowUpSLine size={18} />
                    ) : (
                      <RiArrowDownSLine size={18} />
                    )}
                  </button>

                  {expandedAppointment === appointment._id && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                        <p className="mb-2">
                          <strong>Email:</strong> {appointment.email}
                        </p>
                        <p className="mb-2">
                          <strong>Created:</strong>{" "}
                          {new Date(appointment.createdAt).toLocaleString()}
                        </p>
                        <p>
                          <strong>Notes:</strong>{" "}
                          {appointment.message ||
                            "No additional notes provided."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleManageClick(appointment)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm font-medium"
                  >
                    <RiUserSettingsLine size={16} />
                    <span>Manage</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <Modal isOpen={isManageModalOpen} onClose={handleCloseModal}>
          <div className="p-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Manage Appointment
            </h3>

            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">
                  {selectedAppointment.name}
                </p>
                <p className="text-gray-500">
                  {selectedAppointment.email} &bull; {selectedAppointment.phone}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Department</p>
                  <p className="font-medium text-gray-900">
                    {selectedAppointment.department}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Doctor</p>
                  <p className="font-medium text-gray-900">
                    {selectedAppointment.doctor}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Appointment Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(
                      selectedAppointment.appointmentDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Appointment Time</p>
                  <p className="font-medium text-gray-900">
                    {selectedAppointment.appointmentTime}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <p
                  className={`font-medium ${
                    selectedAppointment.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedAppointment.status.charAt(0).toUpperCase() +
                    selectedAppointment.status.slice(1)}
                </p>
              </div>

              {selectedAppointment.message && (
                <div>
                  <p className="text-gray-500">Patient Notes</p>
                  <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-md">
                    {selectedAppointment.message}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={() => handleUpdateStatus(selectedAppointment._id)}
                disabled={selectedAppointment.status === "completed"}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <RiCalendarCheckLine className="mr-2" />
                Mark as Completed
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const ManageNewsSection = () => {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/news`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        toast.error("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleAddClick = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (article) => {
    setEditingNews(article);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE_URL}/api/news/${newsId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNews(news.filter((item) => item._id !== newsId));
        toast.success("News article deleted successfully!");
      } catch (error) {
        console.error("Failed to delete news article:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete article."
        );
      }
    }
  };

  const handleFormSuccess = (updatedOrNewArticle) => {
    if (editingNews) {
      setNews(
        news.map((item) =>
          item._id === updatedOrNewArticle._id ? updatedOrNewArticle : item
        )
      );
    } else {
      setNews([updatedOrNewArticle, ...news]);
    }
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://placehold.co/600x400/f87171/white?text=Image+Not+Found";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Manage News & Events
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and manage news articles.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <RiAddLine className="mr-2" size={18} />
          Add News
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNews(null);
        }}
        title={editingNews ? "Edit News Article" : "Add News Article"}
      >
        <AddNewsForm
          onSuccess={handleFormSuccess}
          onFormClose={() => {
            setIsModalOpen(false);
            setEditingNews(null);
          }}
          initialData={editingNews}
        />
      </Modal>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-gray-500">
            No news articles found. Click "Add News" to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <img
                src={`${API_BASE_URL}${article.image}`}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={handleImageError}
              />
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-1">
                  {article.category} -{" "}
                  {new Date(article.date).toLocaleDateString()}
                </p>
                <h3 className="text-md font-semibold text-gray-900 mb-2 flex-grow">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                  {article.excerpt}
                </p>
                <div className="border-t border-gray-100 -mx-4 mt-4 pt-4 px-4 flex items-center justify-end space-x-4">
                  <button
                    onClick={() => handleEditClick(article)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <RiEditLine />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(article._id)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <RiDeleteBinLine />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ManageAccessSection = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please log in.");
        }

        const response = await axios.get(`${API_BASE_URL}/api/auth/admins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setAdmins(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch admins");
        }
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const getRoleColor = (role) => {
    return role === "admin"
      ? "from-blue-600 to-indigo-600"
      : "from-gray-500 to-gray-600";
  };

  return (
    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          User Access Management
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm">
          <RiUserAddLine size={20} />
          <span>Add Admin</span>
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading Admins...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
          <p className="font-medium mb-2">Error Loading Admins</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${getRoleColor(
                      admin.role
                    )} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <span className="text-white text-xl font-bold">
                      {admin.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-bold text-gray-900 truncate">
                      {admin.name}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {admin.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="text-sm text-gray-600 space-y-2 mt-4">
                  <p>
                    <span className="font-semibold">Admin ID:</span>{" "}
                    {admin.adminId}
                  </p>
                  <p>
                    <span className="font-semibold">Joined:</span>{" "}
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Last Update:</span>{" "}
                    {new Date(admin.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 flex justify-end space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
