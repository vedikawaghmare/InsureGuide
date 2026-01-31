import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, Eye, EyeOff } from 'lucide-react';

function FacilitatorLogin() {
    const [credentials, setCredentials] = useState({
        facilitatorId: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('Attempting login with:', credentials);

        // Super simple - just check if both fields have any value
        if (credentials.facilitatorId.trim() && credentials.password.trim()) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("token", "facilitator-token");
            localStorage.setItem("role", "facilitator");

            console.log('Login successful!');
            alert('Login successful! Redirecting...');
            navigate('/facilitator');
        } else {
            alert('Please enter both ID and password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Login Options
                </button>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Facilitator Login</h1>
                        <p className="text-gray-600 mt-2">Access your village dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Facilitator ID
                            </label>
                            <input
                                type="text"
                                value={credentials.facilitatorId}
                                onChange={(e) => setCredentials({ ...credentials, facilitatorId: e.target.value })}
                                placeholder="Enter your facilitator ID"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login as Facilitator'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 font-medium mb-2">✅ Demo Mode - Enter ANY text in both fields</p>
                        <p className="text-xs text-green-600">Example: ID: "test" | Password: "test"</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacilitatorLogin;