import React, { useState } from 'react';
import { Video, MessageSquare, X } from 'lucide-react';

interface ConsultationsProps {
  user: {
    name: string;
  };
  role: string;
}

interface Consultation {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: 'Video' | 'Text';
  status: 'Scheduled' | 'In Progress' | 'Completed';
  notes?: string;
}

const Consultations: React.FC<ConsultationsProps> = ({ user, role }) => {
  const [consultations, setConsultations] = useState<Consultation[]>([
    { id: 1, patientName: 'John Doe', date: '2023-04-15', time: '10:00 AM', type: 'Video', status: 'Scheduled' },
    { id: 2, patientName: 'Jane Smith', date: '2023-04-16', time: '2:30 PM', type: 'Text', status: 'Completed', notes: 'Patient reported improvement in symptoms.' },
    { id: 3, patientName: 'Bob Johnson', date: '2023-04-17', time: '11:15 AM', type: 'Video', status: 'In Progress' },
  ]);
  const [showAddConsultation, setShowAddConsultation] = useState(false);
  const [newConsultation, setNewConsultation] = useState<Partial<Consultation>>({ patientName: '', date: '', time: '', type: 'Video', status: 'Scheduled' });
  const [activeConsultation, setActiveConsultation] = useState<Consultation | null>(null);
  const [consultationNotes, setConsultationNotes] = useState('');

  const handleAddConsultation = () => {
    if (newConsultation.patientName && newConsultation.date && newConsultation.time && newConsultation.type) {
      setConsultations([...consultations, { ...newConsultation, id: consultations.length + 1 } as Consultation]);
      setNewConsultation({ patientName: '', date: '', time: '', type: 'Video', status: 'Scheduled' });
      setShowAddConsultation(false);
    }
  };

  const handleStartConsultation = (consultation: Consultation) => {
    setActiveConsultation(consultation);
    setConsultations(consultations.map(c => c.id === consultation.id ? { ...c, status: 'In Progress' } : c));
  };

  const handleEndConsultation = () => {
    if (activeConsultation) {
      setConsultations(consultations.map(c => c.id === activeConsultation.id ? { ...c, status: 'Completed', notes: consultationNotes } : c));
      setActiveConsultation(null);
      setConsultationNotes('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Consultations</h2>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => setShowAddConsultation(true)}>
            <Video className="inline-block mr-2" /> New Video Consultation
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowAddConsultation(true)}>
            <MessageSquare className="inline-block mr-2" /> New Text Consultation
          </button>
        </div>
        <div>
          <select className="border rounded p-2">
            <option>All Consultations</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      {showAddConsultation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Schedule New Consultation</h3>
              <button onClick={() => setShowAddConsultation(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full p-2 mb-2 border rounded"
              value={newConsultation.patientName}
              onChange={(e) => setNewConsultation({ ...newConsultation, patientName: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-2 border rounded"
              value={newConsultation.date}
              onChange={(e) => setNewConsultation({ ...newConsultation, date: e.target.value })}
            />
            <input
              type="time"
              className="w-full p-2 mb-2 border rounded"
              value={newConsultation.time}
              onChange={(e) => setNewConsultation({ ...newConsultation, time: e.target.value })}
            />
            <select
              className="w-full p-2 mb-4 border rounded"
              value={newConsultation.type}
              onChange={(e) => setNewConsultation({ ...newConsultation, type: e.target.value as 'Video' | 'Text' })}
            >
              <option value="Video">Video Consultation</option>
              <option value="Text">Text Consultation</option>
            </select>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddConsultation}
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
      {activeConsultation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Active Consultation with {activeConsultation.patientName}</h3>
              <button onClick={handleEndConsultation}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="mb-4">
              <p><strong>Type:</strong> {activeConsultation.type}</p>
              <p><strong>Date:</strong> {activeConsultation.date}</p>
              <p><strong>Time:</strong> {activeConsultation.time}</p>
            </div>
            <textarea
              className="w-full p-2 mb-4 border rounded h-40"
              placeholder="Consultation notes..."
              value={consultationNotes}
              onChange={(e) => setConsultationNotes(e.target.value)}
            ></textarea>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleEndConsultation}
            >
              End Consultation
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded">
        {consultations.map((consultation) => (
          <div key={consultation.id} className="border-b p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{consultation.patientName}</h3>
              <p className="text-gray-600">{consultation.date} at {consultation.time}</p>
            </div>
            <div className="flex items-center">
              {consultation.type === 'Video' ? (
                <Video className="mr-2 text-blue-500" />
              ) : (
                <MessageSquare className="mr-2 text-green-500" />
              )}
              <span className="mr-4">{consultation.type} Consultation</span>
            </div>
            <div>
              <span className={`px-2 py-1 rounded ${
                consultation.status === 'Scheduled' ? 'bg-yellow-200 text-yellow-800' :
                consultation.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
              }`}>
                {consultation.status}
              </span>
            </div>
            <div>
              {consultation.status === 'Scheduled' && (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleStartConsultation(consultation)}
                >
                  {role === 'doctor' ? 'Start' : 'Join'}
                </button>
              )}
              {consultation.status === 'In Progress' && role === 'doctor' && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => setActiveConsultation(consultation)}
                >
                  Continue
                </button>
              )}
              <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultations;