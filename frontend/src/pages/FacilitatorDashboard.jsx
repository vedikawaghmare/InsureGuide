import { useEffect, useState } from "react";
import { fetchSurveys, submitSurvey } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, Clock, CheckCircle, AlertCircle, Target, Phone, Plus, LogOut, FileText, Leaf, TreePine } from "lucide-react";
import SustainabilityTip from "../components/SustainabilityTip";

function FacilitatorDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = surveys.length;
  const completed = surveys.filter(s => s.completed).length;
  const pending = total - completed;
  const target = 50;

  const getProgressPercentage = () => {
    if (target === 0) return 0;
    return Math.round((completed / target) * 100);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const handleAddFamily = async () => {
    const name = prompt('Enter family name:');
    if (!name) return;

    const village = prompt('Enter village name:', 'Parbhani');
    if (!village) return;

    setLoading(true);
    try {
      // Create an initial survey record in the database with required fields
      const newPerson = {
        userName: name,
        village: village,
        landSize: 0, // Default for new record
        cropType: "Primary", // Default for new record
        completed: false,
        status: 'pending'
      };

      await submitSurvey(newPerson);
      // Refresh the list from database
      const res = await fetchSurveys();
      setSurveys(res.data.data);
      alert(`${name} added successfully to the database!`);
    } catch (err) {
      console.error("Error adding family", err);
      alert("Failed to save to database. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const res = await fetchSurveys();
        setSurveys(res.data.data);
      } catch (err) {
        console.error("Error fetching surveys", err);
      } finally {
        setLoading(false);
      }
    };
    loadSurveys();
  }, []);

  const getPendingTasks = () => {
    return (surveys || []).filter(s => !s.completed).slice(0, 3);
  };

  if (loading) return (
    <div className="min-h-screen bg-cool-grey flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
        <p className="text-slate-600 font-bold">Syncing with Database...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cool-grey text-slate-900">
      {/* Header */}
      <header className="fixed w-full top-0 bg-cool-grey/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-white text-lg">🛡️</span>
            </div>
            <span className="text-xl font-bold text-slate-900">InsureGuide</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Village Helper</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 px-6 lg:px-10 pb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <SustainabilityTip context="facilitator" />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Families</p>
                    <p className="text-2xl font-black text-slate-900">{total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</p>
                    <p className="text-2xl font-black text-green-600">{completed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</p>
                    <p className="text-2xl font-black text-orange-600">{pending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Goal</p>
                    <p className="text-2xl font-black text-purple-600">{target}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900">
                <Clock className="w-8 h-8 text-orange-500" />
                Today's Priority
              </h2>
              <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6">
                <p className="font-bold text-orange-800 mb-6 flex items-center gap-2 text-lg">
                  <AlertCircle size={20} /> {getPendingTasks().length} families need immediate help
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {getPendingTasks().length > 0 ? getPendingTasks().map((person, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                          {person.userName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 truncate">{person.userName}</p>
                          <p className="text-xs font-bold text-slate-500 uppercase">{person.status || 'Pending'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/agent?userId=${person._id}`)}
                        className="w-full bg-slate-900 text-white py-3 rounded-2xl hover:bg-slate-800 transition-colors text-sm font-bold active:scale-[0.98]"
                      >
                        Start Assistance
                      </button>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-10">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-green-800 font-bold text-lg">Great job! All clear for today.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* My assigned families List */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900">
                  <Users className="w-8 h-8 text-slate-900" />
                  My Village Families
                </h2>
                <button
                  onClick={() => {
                    const name = prompt('Enter family name:');
                    if (name) {
                      const newPerson = {
                        _id: Date.now().toString(),
                        userName: name,
                        village: 'Parbhani',
                        completed: false,
                        createdAt: new Date(),
                        status: 'pending'
                      };
                      setSurveys([...surveys, newPerson]);
                    }
                  }}
                  className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Plus size={18} /> Add Family
                </button>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px] rounded-l-2xl">Name</th>
                      <th className="text-left py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Village</th>
                      <th className="text-left py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Status</th>
                      <th className="text-left py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Last Sync</th>
                      <th className="text-right py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px] rounded-r-2xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {surveys.length > 0 ? surveys.map((s) => (
                      <tr key={s._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold group-hover:bg-white transition-colors">
                              {s.userName[0]}
                            </div>
                            <span className="font-bold text-slate-900">{s.userName}</span>
                          </div>
                        </td>
                        <td className="p-4 px-6 text-slate-600 font-medium">{s.village}</td>
                        <td className="p-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.completed ? 'bg-green-600' : 'bg-orange-600'}`} />
                            {s.completed ? 'Protected' : 'Pending'}
                          </span>
                        </td>
                        <td className="p-4 px-6 text-sm text-slate-500 font-medium">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 px-6 text-right">
                          <Link
                            to={`/recommendations/${s._id}`}
                            className="inline-block bg-slate-100 text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors text-xs font-bold"
                          >
                            Profile
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="py-20 text-center">
                          <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-bold">No families assigned yet.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Rail / Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">

            {/* Quick Actions Restructured */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              <h2 className="text-xl font-black mb-6 text-slate-900">Admin Controls</h2>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    const pendingUsers = surveys.filter(s => !s.completed);
                    if (pendingUsers.length > 0) {
                      alert(`Reminder sent to ${pendingUsers.length} pending families!`);
                    } else {
                      alert('No pending families to remind.');
                    }
                  }}
                  className="w-full flex items-center gap-4 p-5 bg-green-50/50 border border-green-100 rounded-3xl hover:bg-green-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-green-900">Send Reminders</p>
                    <p className="text-xs font-bold text-green-600">Notify pending families</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const report = `Village Report - Parbhani\n\nTotal Families: ${total}\nCompleted: ${completed}\nPending: ${pending}\nProgress: ${getProgressPercentage()}%\n\nGenerated on: ${new Date().toLocaleDateString()}`;
                    alert(report);
                  }}
                  className="w-full flex items-center gap-4 p-5 bg-purple-50/50 border border-purple-100 rounded-3xl hover:bg-purple-50 transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-purple-900">Export Report</p>
                    <p className="text-xs font-bold text-purple-600">Download CSV/PDF</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Village Progress Tracker (Moved to Sidebar) */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 sticky top-24">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900">
                <Target className="w-6 h-6 text-green-600" />
                Village Progress
              </h2>

              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-600">{completed} families</span>
                  <span className="text-sm font-bold text-slate-600">Goal: {target}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden p-0.5">
                  <div
                    className="bg-slate-900 h-full rounded-full transition-all duration-700"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <p className="text-3xl font-black text-slate-900 mb-6">{getProgressPercentage()}% <span className="text-xs font-bold text-slate-400 uppercase">Reached</span></p>

                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    {completed === 0 ? "🌟 Ready to start! Add your first family." :
                      completed < target ? `💪 Just ${target - completed} more families to hit this month's goal!` :
                        "🎉 Target achieved! You've done amazing work."}
                  </p>
                </div>
              </div>

              {/* Carbon Footprint Widget (Moved to Sidebar) */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sustainability Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-5 rounded-3xl text-center">
                    <p className="text-xl font-black text-green-900">{completed * 4}</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase">Forms Saved</p>
                  </div>
                  <div className="bg-green-50 p-5 rounded-3xl text-center">
                    <p className="text-xl font-black text-green-900">{Math.round(completed * 0.02 * 100) / 100}</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase">Trees Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitatorDashboard;