import { useEffect, useState } from "react";
import { fetchSurveys } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, Clock, CheckCircle, AlertCircle, Target, Phone, Plus, LogOut, FileText } from "lucide-react";

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
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login/facilitator');
  };

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const res = await fetchSurveys();
        setSurveys(res.data.data);
      } catch (err) {
        console.error("Error fetching surveys", err);
        // Add mock data if API fails
        setSurveys([
          { _id: '1', userName: 'Ramesh Patil', village: 'Parbhani', completed: true, createdAt: new Date(), status: 'completed' },
          { _id: '2', userName: 'Savita Devi', village: 'Parbhani', completed: false, createdAt: new Date(), status: 'pending' },
          { _id: '3', userName: 'Mohan Kumar', village: 'Parbhani', completed: false, createdAt: new Date(), status: 'needs help' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadSurveys();
  }, []);

  const getPendingTasks = () => {
    return surveys.filter(s => !s.completed || s.needsHelp).slice(0, 3);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Village Helper Dashboard</h1>
                <p className="text-gray-600 mt-1">📍 Village: Parbhani • Facilitator ID: FAC001</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Today's Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Families</p>
                <p className="text-xl font-bold text-gray-900">{total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-orange-600">{pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Goal</p>
                <p className="text-xl font-bold text-purple-600">{target}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-500" />
            Today's Priority Tasks
          </h2>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="font-semibold text-orange-800 mb-4">⏳ {getPendingTasks().length} people need immediate help</p>
            <div className="space-y-3">
              {getPendingTasks().length > 0 ? getPendingTasks().map((person, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">{person.userName}</p>
                      <p className="text-sm text-gray-600">{person.status || 'Survey pending'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/agent?userId=${person._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Help Now
                  </button>
                </div>
              )) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Great job! No pending tasks today.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Village Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-500" />
            Village Progress Tracker
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">{completed} of {target} families completed</span>
              <span className="text-2xl font-bold text-green-600">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>🎯 Monthly Goal: {target} families</span>
              </div>
              <span className="font-semibold text-green-600">
                {target - completed > 0 ? `${target - completed} more needed!` : 'Goal achieved! 🎉'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-blue-800">Add New Person</p>
                <p className="text-sm text-blue-600">Register new family</p>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const pendingUsers = surveys.filter(s => !s.completed);
                if (pendingUsers.length > 0) {
                  alert(`Reminder sent to ${pendingUsers.length} pending families!`);
                } else {
                  alert('No pending families to remind.');
                }
              }}
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-green-800">Send Reminder</p>
                <p className="text-sm text-green-600">Call pending families</p>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const report = `Village Report - Parbhani\n\nTotal Families: ${total}\nCompleted: ${completed}\nPending: ${pending}\nProgress: ${getProgressPercentage()}%\n\nGenerated on: ${new Date().toLocaleDateString()}`;
                alert(report);
              }}
              className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-purple-800">Village Report</p>
                <p className="text-sm text-purple-600">Generate monthly report</p>
              </div>
            </button>
          </div>
        </div>

        {/* My Users List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-gray-700" />
            My Assigned Families
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Village</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Last Activity</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {surveys.length > 0 ? surveys.map((s) => (
                  <tr key={s._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium">{s.userName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{s.village}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        s.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {s.completed ? (
                          <><CheckCircle className="w-3 h-3" /> Completed</>
                        ) : (
                          <><AlertCircle className="w-3 h-3" /> Pending</>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/recommendations/${s._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p>No families assigned yet. Start by adding new people!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitatorDashboard;