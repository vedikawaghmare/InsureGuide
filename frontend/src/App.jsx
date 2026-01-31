import { Routes, Route } from "react-router-dom";
import "./i18n";
import GoogleTranslate from "./components/GoogleTranslate";

// Pages
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

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="relative">
      {/* Global Language Selector - appears on all pages except language select */}
      <div className="fixed top-4 right-4 z-[60]">
        <GoogleTranslate />
      </div>

      <Routes>
        {/* Initial flow */}
        <Route path="/" element={<LanguageSelect />} />
        <Route path="/login" element={<LoginMethod />} />

        {/* Login methods */}
        <Route path="/login/biometric" element={<BiometricLogin />} />
        <Route path="/login/missed" element={<MissedCallLogin />} />
        <Route path="/login/sms" element={<SmsOtpLogin />} />
        <Route path="/login/facilitator" element={<FacilitatorLogin />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent"
          element={
            <ProtectedRoute>
              <VirtualAgent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/survey"
          element={
            <ProtectedRoute>
              <Survey />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/risk-map"
          element={
            <ProtectedRoute>
              <RiskMap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <AgentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claim"
          element={
            <ProtectedRoute>
              <ClaimHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claim/new"
          element={
            <ProtectedRoute>
              <NewClaim />
            </ProtectedRoute>
          }
        />

        <Route
          path="/location-insurance"
          element={
            <ProtectedRoute>
              <LocationInsurance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facilitator"
          element={
            <ProtectedRoute requiredRole="facilitator">
              <FacilitatorDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/claim/track"
          element={
            <ProtectedRoute>
              <TrackClaim />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
