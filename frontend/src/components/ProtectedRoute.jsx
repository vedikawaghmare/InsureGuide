import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!isAuthenticated || !token) {
        return <Navigate to="/" replace />;
    }

    // Role mismatch
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute;
