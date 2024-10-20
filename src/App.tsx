import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserCircle2, Calendar, FileText, Video, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PatientRecords from './components/PatientRecords';
import Appointments from './components/Appointments';
import Prescriptions from './components/Prescriptions';
import Consultations from './components/Consultations';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  const handleLogin = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
  };

  const handleLogout = () => {
    setUser(null);
    setRole('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user ? (
          <div className="flex">
            <nav className="bg-blue-600 text-white w-64 min-h-screen p-4">
              <h1 className="text-2xl font-bold mb-8">HealthCare Hub</h1>
              <ul>
                <li className="mb-4">
                  <Link to="/" className="flex items-center">
                    <UserCircle2 className="mr-2" />
                    Dashboard
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/records" className="flex items-center">
                    <FileText className="mr-2" />
                    {role === 'doctor' ? 'Patient Records' : 'My Records'}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/appointments" className="flex items-center">
                    <Calendar className="mr-2" />
                    Appointments
                  </Link>
                </li>
                {role === 'doctor' && (
                  <li className="mb-4">
                    <Link to="/prescriptions" className="flex items-center">
                      <FileText className="mr-2" />
                      Prescriptions
                    </Link>
                  </li>
                )}
                <li className="mb-4">
                  <Link to="/consultations" className="flex items-center">
                    <Video className="mr-2" />
                    Consultations
                  </Link>
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </nav>
            <main className="flex-1 p-8">
              <Routes>
                <Route path="/" element={<Dashboard user={user} role={role} />} />
                <Route path="/records" element={<PatientRecords user={user} role={role} />} />
                <Route path="/appointments" element={<Appointments user={user} role={role} />} />
                <Route path="/prescriptions" element={<Prescriptions user={user} />} />
                <Route path="/consultations" element={<Consultations user={user} role={role} />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;