import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookAppointment from "./pages/BookAppointment";
import ServiceDetail from "./pages/ServiceDetail";
import ServicesPage from "./pages/ServicesPage";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
import DoctorsPage from "./pages/DoctorsPage";
import GalleryPage from "./pages/GalleryPage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewsPostTemplate from "./pages/NewsPostTemplate";
import Posts_Blog from "./pages/Posts_Blog";
import DoctorsKnowledge from "./pages/DoctorsKnowledge";
import DoctorDetail from "./pages/DoctorDetail";
import ModelDetailTemplate from "./pages/ModelDetailTemplate";
import ChatBot from "./components/ChatBot";
import FloatingActionButtons from "./components/FloatingActionButtons";
import { NewsProvider } from "./context/NewsContext";


// Protected Route Wrapper for Patients
const ProtectedPatientRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "patient") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Protected Route Wrapper for Admins
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout component for pages with Navbar and Footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <div className="relative">
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50">
          <NewsProvider>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/patient-dashboard"
                element={
                  <ProtectedPatientRoute>
                    <PatientDashboard />
                  </ProtectedPatientRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />

              {/* Public Routes - with Navbar and Footer */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/book-appointment"
                element={
                  <MainLayout>
                    <BookAppointment />
                  </MainLayout>
                }
              />
              <Route
                path="/services"
                element={
                  <MainLayout>
                    <ServicesPage />
                  </MainLayout>
                }
              />
              <Route
                path="/services/:serviceId"
                element={
                  <MainLayout>
                    <ServiceDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <AboutUs />
                  </MainLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <MainLayout>
                    <Contact />
                  </MainLayout>
                }
              />
              <Route
                path="/posts-blog"
                element={
                  <MainLayout>
                    <Posts_Blog />
                  </MainLayout>
                }
              />
              <Route
                path="/doctors"
                element={
                  <MainLayout>
                    <DoctorsPage />
                  </MainLayout>
                }
              />
              <Route
                path="/why-us/:slug"
                element={
                  <MainLayout>
                    <ModelDetailTemplate />
                  </MainLayout>
                }
              />

              <Route
                path="/doctor/:id"
                element={
                  <MainLayout>
                    <DoctorDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/gallery"
                element={
                  <MainLayout>
                    <GalleryPage />
                  </MainLayout>
                }
              />
              <Route
                path="/news/:postId"
                element={
                  <MainLayout>
                    <NewsPostTemplate />
                  </MainLayout>
                }
              />
              <Route
                path="/blog"
                element={
                  <MainLayout>
                    <Posts_Blog />
                  </MainLayout>
                }
              />
              <Route
                path="/doctors-knowledge"
                element={
                  <MainLayout>
                    <DoctorsKnowledge />
                  </MainLayout>
                }
              />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NewsProvider>
        </div>
      </Router>
      <ChatBot />
      <FloatingActionButtons />
    </div>
  );
}

export default App;
