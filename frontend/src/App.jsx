import { Routes, Route } from "react-router-dom";
import "./i18n";

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

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Initial flow */}
      <Route path="/" element={<LanguageSelect />} />
      <Route path="/login" element={<LoginMethod />} />

      {/* Login methods */}
      <Route path="/login/biometric" element={<BiometricLogin />} />
      <Route path="/login/missed" element={<MissedCallLogin />} />
      <Route path="/login/sms" element={<SmsOtpLogin />} />

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
        path="/claim/track"
        element={
          <ProtectedRoute>
            <TrackClaim />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
