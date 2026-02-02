import { Routes, Route, useLocation } from "react-router-dom";
import "./i18n";

// Pages
import LandingPage from "./pages/LandingPage";
import LanguageSelect from "./pages/LanguageSelect";
import LoginMethod from "./pages/LoginMethod";
import BiometricLogin from "./pages/BiometricLogin";
import MissedCallLogin from "./pages/MissedCallLogin";
import SmsOtpLogin from "./pages/SmsOtpLogin";
import DashboardHome from "./pages/DashboardHome";
import VirtualAgent from "./pages/VirtualAgent";
import RiskMap from "./pages/RiskMap";
import ClaimHome from "./pages/ClaimHome";
import NewClaim from "./pages/NewClaim";
import TrackClaim from "./pages/TrackClaim";
import AgentsList from "./pages/AgentsList";
import Survey from "./pages/Survey";
import Recommendations from "./pages/Recommendations";
import FacilitatorDashboard from "./pages/FacilitatorDashboard";
import FacilitatorLogin from "./pages/FacilitatorLogin";
import LocationInsurance from "./pages/LocationInsurance";
import Schemes from "./pages/Schemes";
import PolicyDetails from "./pages/PolicyDetails";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import GoogleTranslate from "./components/GoogleTranslate";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/risk') ||
    location.pathname.startsWith('/claim') ||
    location.pathname.startsWith('/agents') ||
    location.pathname.startsWith('/survey');

  return (
    <div className="relative">
      {/* Global Translator - Persistent & Invisible to handle background heavy lifting */}
      <GoogleTranslate hidden={true} />

      {/* Visible Translator for Dashboard - Only shown when logged in */}
      {isDashboard && (
        <div className="fixed top-4 right-4 z-[100] scale-90 md:scale-100 origin-top-right">
          <GoogleTranslate />
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/start" element={<LanguageSelect />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginMethod />} />
        <Route path="/login/biometric" element={<BiometricLogin />} />
        <Route path="/login/missed" element={<MissedCallLogin />} />
        <Route path="/login/sms" element={<SmsOtpLogin />} />
        <Route path="/login/facilitator" element={<FacilitatorLogin />} />

        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/risk-map" element={<ProtectedRoute><RiskMap /></ProtectedRoute>} />
          <Route path="/claim" element={<ProtectedRoute><ClaimHome /></ProtectedRoute>} />
          <Route path="/claim/new" element={<ProtectedRoute><NewClaim /></ProtectedRoute>} />
          <Route path="/claim/track" element={<ProtectedRoute><TrackClaim /></ProtectedRoute>} />
          <Route path="/agents" element={<ProtectedRoute><AgentsList /></ProtectedRoute>} />
          <Route path="/agent" element={<ProtectedRoute><VirtualAgent /></ProtectedRoute>} />
          <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
          <Route path="/recommendations/:id?" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/location-insurance" element={<ProtectedRoute><LocationInsurance /></ProtectedRoute>} />
          <Route path="/schemes" element={<ProtectedRoute><Schemes /></ProtectedRoute>} />
          <Route path="/policy/:id" element={<ProtectedRoute><PolicyDetails /></ProtectedRoute>} />
          <Route path="/policy/renew/:type" element={<ProtectedRoute><PolicyDetails /></ProtectedRoute>} />

          <Route path="/facilitator" element={
            <ProtectedRoute requiredRole="facilitator">
              <FacilitatorDashboard />
            </ProtectedRoute>
          } />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
