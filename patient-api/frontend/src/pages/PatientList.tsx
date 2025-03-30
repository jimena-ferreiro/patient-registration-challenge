import React, { useEffect, useState } from "react";
import PatientCard from "../components/PatientCard";
import PatientForm from "../components/PatientForm";

interface Patient {
  id: number;
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  documentPhoto: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPatients = () => {
    setLoading(true);
    fetch("http://localhost:3000/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientAdded = (newPatient: Patient) => {
    setShowForm(false);
    fetchPatients();
  };

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>
      <button className="add-patient-btn" onClick={() => setShowForm(true)}>+ Add Patient</button>

      {showForm && <PatientForm onPatientAdded={handlePatientAdded} />}

      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No registered patients.</p>
      ) : (
        <div className="patient-list">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
