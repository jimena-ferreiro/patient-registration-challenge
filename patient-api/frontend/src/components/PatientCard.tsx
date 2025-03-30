import React, { useState } from "react";

interface Patient {
  id: number;
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  documentPhoto: string;
}

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="patient-card" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="patient-card-header">
        <img src={patient.documentPhoto} alt="Document" className="patient-photo" />
        <h3>{patient.fullName}</h3>
      </div>

      {isExpanded && (
        <div className="patient-card-details">
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phoneCode} {patient.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
