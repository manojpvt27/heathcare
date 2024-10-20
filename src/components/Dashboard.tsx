import React from 'react';
import { Activity, Users, Calendar, FileText } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
  };
  role: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, role }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Appointments"
          value="5"
          icon={<Calendar className="w-8 h-8 text-blue-500" />}
        />
        <DashboardCard
          title={role === 'doctor' ? 'Patients' : 'Consultations'}
          value={role === 'doctor' ? '20' : '3'}
          icon={<Users className="w-8 h-8 text-green-500" />}
        />
        <DashboardCard
          title="Prescriptions"
          value="8"
          icon={<FileText className="w-8 h-8 text-yellow-500" />}
        />
        <DashboardCard
          title="Health Status"
          value="Good"
          icon={<Activity className="w-8 h-8 text-red-500" />}
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;