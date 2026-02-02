import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import GoogleTranslate from "./GoogleTranslate";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar - Fixed Position */}
            <Sidebar />

            {/* Main Content Area - Offset by Sidebar Width */}
            <div className="flex-1 ml-20 md:ml-64 relative min-h-screen transition-all duration-300">
                {/* Dynamic Page Content */}
                <main className="p-4 md:p-8 min-h-screen animate-in fade-in duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
