import { NavLink, useNavigate } from "react-router-dom";
import {
    Home,
    Map,
    FileText,
    Users,
    Bot,
    LogOut,
    Settings,
    ClipboardCheck
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
    const navigate = useNavigate();

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/risk-map", icon: Map, label: "Risk Map" },
        { to: "/claim", icon: FileText, label: "Claims" },
        { to: "/agents", icon: Users, label: "Agents" },
        { to: "/agent", icon: Bot, label: "Virtual Agent" },
        { to: "/survey", icon: ClipboardCheck, label: "Survey" },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-slate-900 text-white flex flex-col z-[100] transition-all duration-300">
            {/* Brand */}
            <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-700 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🛡️</span>
                </div>
                <span className="hidden md:block ml-3 font-bold text-xl tracking-tight">InsureGuide</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 flex flex-col gap-2 px-2 md:px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center justify-center md:justify-start p-3 rounded-xl transition-all ${isActive
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <item.icon size={24} />
                        <span className="hidden md:block ml-3 font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-700 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-center md:justify-start">
                    <ThemeToggle className="w-full md:w-fit" />
                    <span className="hidden md:block ml-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Switch Theme</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center md:justify-start p-3 rounded-xl text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                >
                    <LogOut size={24} />
                    <span className="hidden md:block ml-3 font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
