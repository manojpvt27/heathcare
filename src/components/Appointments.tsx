import React, { useState } from 'react';
import { Calendar, Clock, Plus, X } from 'lucide-react';

interface AppointmentsProps {
  user: {
    name: string;
  };
  role: string;
}

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
}

const Appointments: React.FC<AppointmentsProps> = ({ user, role }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: 'John Doe', date: '2023-04-15', time: '10:00 AM', reason: 'Check-up' },
    { id: 2, patientName: 'Jane Smith', date: '2023-04-16', time: '2:30 PM', reason: 'Follow-up' },
    { id: 3, patientName: 'Bob Johnson', date: '2023-04-17', time: '11:15 AM', reason: 'Consultation' },
  ]);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ patientName: '', date: '', time: '', reason: '' });

  const handleAddAppointment = () => {
    if (newAppointment.patientName && newAppointment.date && newAppointment.time && newAppointment.reason) {
      setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }]);
      setNewAppointment({ patientName: '', date: '', time: '', reason: '' });
      setShowAddAppointment(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowAddAppointment(true)}
          >
            <Plus className="mr-2" /> {role === 'doctor' ? 'Add Appointment' : 'Book Appointment'}
          </button>
        </div>
        <div>
          <select className="border rounded p-2">
            <option>All Appointments</option>
            <option>Upcoming</option>
            <option>Past</option>
          </select>
        </div>
      </div>
      {showAddAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Appointment</h3>
              <button onClick={() => setShowAddAppointment(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full p-2 mb-2 border rounded"
              value={newAppointment.patientName}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-2 border rounded"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
            <input
              type="time"
              className="w-full p-2 mb-2 border rounded"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Reason"
              className="w-full p-2 mb-4 border rounded"
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            />
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddAppointment}
            >
              Add Appointment
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border-b p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{appointment.patientName}</h3>
              <p className="text-gray-600">{appointment.reason}</p>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-400" />
              <span className="mr-4">{appointment.date}</span>
              <Clock className="mr-2 text-gray-400" />
              <span>{appointment.time}</span>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                {role === 'doctor' ? 'Start' : 'Join'}
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;