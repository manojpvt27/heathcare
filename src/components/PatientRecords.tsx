import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface PatientRecordsProps {
  user: {
    name: string;
  };
  role: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
}

const PatientRecords: React.FC<PatientRecordsProps> = ({ user, role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes' },
    { id: 3, name: 'Bob Johnson', age: 42, condition: 'Asthma' },
  ]);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.condition) {
      setPatients([...patients, { ...newPatient, id: patients.length + 1, age: parseInt(newPatient.age) }]);
      setNewPatient({ name: '', age: '', condition: '' });
      setShowAddPatient(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {role === 'doctor' ? 'Patient Records' : 'My Health Records'}
      </h2>
      <div className="mb-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-2 pl-10 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        {role === 'doctor' && (
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setShowAddPatient(true)}
          >
            <Plus className="mr-2" /> Add Patient
          </button>
        )}
      </div>
      {showAddPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Patient</h3>
              <button onClick={() => setShowAddPatient(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 border rounded"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full p-2 mb-2 border rounded"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Condition"
              className="w-full p-2 mb-4 border rounded"
              value={newPatient.condition}
              onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
            />
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddPatient}
            >
              Add Patient
            </button>
          </div>
        </div>
      )}
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Age</th>
            <th className="py-3 px-6 text-left">Condition</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{patient.name}</td>
              <td className="py-3 px-6 text-left">{patient.age}</td>
              <td className="py-3 px-6 text-left">{patient.condition}</td>
              <td className="py-3 px-6 text-left">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">View</button>
                {role === 'doctor' && (
                  <button className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientRecords;