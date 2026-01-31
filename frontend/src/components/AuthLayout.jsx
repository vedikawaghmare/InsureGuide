function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl md:max-w-2xl">
        {/* App Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xl">🛡️</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">InsureGuide</h1>
          <p className="text-gray-600 mt-1">
            Your trusted digital insurance assistant
          </p>
        </div>

        {/* Page Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {children}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
