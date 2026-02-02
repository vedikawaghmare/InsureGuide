export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-cool-grey text-slate-900">

      {/* SAME HEADER AS LANDING */}
      <header className="fixed w-full top-0 bg-cool-grey/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white text-lg">🛡️</span>
          </div>
          <span className="text-xl font-bold">InsureGuide</span>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {children}
        </div>
      </main>

    </div>
  );
}
