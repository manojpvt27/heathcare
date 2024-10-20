import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';

interface PrescriptionsProps {
  user: {
    name: string;
  };
}

interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const Prescriptions: React.FC<PrescriptionsProps> = ({ user }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 1, patientName: 'John Doe', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
    { id: 2, patientName: 'Jane Smith', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
    { id: 3, patientName: 'Bob Johnson', medication: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', duration: '90 days' },
  ]);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [newPrescription, setNewPrescription] = useState({ patientName: '', medication: '', dosage: '', frequency: '', duration: '' });
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);

  const handleAddPrescription = () => {
    if (newPrescription.patientName && newPrescription.medication && newPrescription.dosage && newPrescription.frequency && newPrescription.duration) {
      setPrescriptions([...prescriptions, { ...newPrescription, id: prescriptions.length + 1 }]);
      setNewPrescription({ patientName: '', medication: '', dosage: '', frequency: '', duration: '' });
      setShowAddPrescription(false);
    }
  };

  const handleEditPrescription = (prescription: Prescription) => {
    setEditingPrescription(prescription);
    setShowAddPrescription(true);
  };

  const handleUpdatePrescription = () => {
    if (editingPrescription) {
      setPrescriptions(prescriptions.map(p => p.id === editingPrescription.id ? editingPrescription : p));
      setEditingPrescription(null);
      setShowAddPrescription(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => {
            setEditingPrescription(null);
            setShowAddPrescription(true);
          }}
        >
          <Plus className="mr-2" /> New Prescription
        </button>
      </div>
      {showAddPrescription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}</h3>
              <button onClick={() => setShowAddPrescription(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full p-2 mb-2 border rounded"
              value={editingPrescription ? editingPrescription.patientName : newPrescription.patientName}
              onChange={(e) => editingPrescription ? setEditingPrescription({...editingPrescription, patientName: e.target.value}) : setNewPrescription({ ...newPrescription, patientName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Medication"
              className="w-full p-2 mb-2 border rounded"
              value={editingPrescription ? editingPrescription.medication : newPrescription.medication}
              onChange={(e) => editingPrescription ? setEditingPrescription({...editingPrescription, medication: e.target.value}) : setNewPrescription({ ...newPrescription, medication: e.target.value })}
            />
            <input
              type="text"
              placeholder="Dosage"
              className="w-full p-2 mb-2 border rounded"
              value={editingPrescription ? editingPrescription.dosage : newPrescription.dosage}
              onChange={(e) => editingPrescription ? setEditingPrescription({...editingPrescription, dosage: e.target.value}) : setNewPrescription({ ...newPrescription, dosage: e.target.value })}
            />
            <input
              type="text"
              placeholder="Frequency"
              className="w-full p-2 mb-2 border rounded"
              value={editingPrescription ? editingPrescription.frequency : newPrescription.frequency}
              onChange={(e) => editingPrescription ? setEditingPrescription({...editingPrescription, frequency: e.target.value}) : setNewPrescription({ ...newPrescription, frequency: e.target.value })}
            />
            <input
              type="text"
              placeholder="Duration"
              className="w-full p-2 mb-4 border rounded"
              value={editingPrescription ? editingPrescription.duration : newPrescription.duration}
              onChange={(e) => editingPrescription ? setEditingPrescription({...editingPrescription, duration: e.target.value}) : setNewPrescription({ ...newPrescription, duration: e.target.value })}
            />
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              onClick={editingPrescription ? handleUpdatePrescription : handleAddPrescription}
            >
              {editingPrescription ? 'Update Prescription' : 'Add Prescription'}
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="border-b p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{prescription.patientName}</h3>
              <div className="flex items-center">
                <FileText className="mr-2 text-gray-400" />
                <button className="text-blue-500 mr-2" onClick={() => handleEditPrescription(prescription)}>Edit</button>
                <button className="text-blue-500">View Details</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Medication</p>
                <p className="font-medium">{prescription.medication}</p>
              </div>
              <div>
                <p className="text-gray-600">Dosage</p>
                <p className="font-medium">{prescription.dosage}</p>
              </div>
              <div>
                <p className="text-gray-600">Frequency</p>
                <p className="font-medium">{prescription.frequency}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{prescription.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;