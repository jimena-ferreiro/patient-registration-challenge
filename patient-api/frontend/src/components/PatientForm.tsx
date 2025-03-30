import React, { useState } from "react";
import Modal from "./Modal";

interface PatientFormProps {
  onPatientAdded: (patient: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPatientAdded }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: "success" | "error"; message: string }>({
    isOpen: false,
    type: "success",
    message: "",
  });

  const validateInputs = () => {
    let newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-Z\s]+$/.test(fullName)) newErrors.fullName = "Full name must contain only letters.";
    if (!email.endsWith("@gmail.com")) newErrors.email = "Only @gmail.com addresses are allowed.";
    if (!phoneCode) newErrors.phoneCode = "Country code is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!documentPhoto) newErrors.documentPhoto = "A document photo is required.";
    else if (!documentPhoto.name.endsWith(".jpg")) newErrors.documentPhoto = "Only .jpg images are allowed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".jpg")) {
      setDocumentPhoto(file);
      setErrors((prev) => ({ ...prev, documentPhoto: "" }));
    } else {
      setErrors((prev) => ({ ...prev, documentPhoto: "Only .jpg images are allowed." }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneCode", phoneCode);
    formData.append("phoneNumber", phoneNumber);
    formData.append("documentPhoto", documentPhoto!);

    try {
      const res = await fetch("http://localhost:3000/patients", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newPatient = await res.json();
        onPatientAdded(newPatient);
        setModalState({ isOpen: true, type: "success", message: "Patient added successfully!" });
        setFullName("");
        setEmail("");
        setPhoneCode("");
        setPhoneNumber("");
        setDocumentPhoto(null);
        setErrors({});
      } else {
        setModalState({ isOpen: true, type: "error", message: "Failed to add patient." });
      }
    } catch {
      setModalState({ isOpen: true, type: "error", message: "An error occurred." });
    }
  };

  return (
    <div className="patient-form">
      <h3>Register New Patient</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="phone-input">
          <input
            type="text"
            placeholder="+Code"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
          />
          {errors.phoneCode && <p className="error-message">{errors.phoneCode}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>

        <div
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {documentPhoto ? (
            <p>{documentPhoto.name}</p>
          ) : (
            <p>Drag & drop a .jpg document photo here</p>
          )}
        </div>
        {errors.documentPhoto && <p className="error-message">{errors.documentPhoto}</p>}

        <button type="submit">Submit</button>
      </form>

      <Modal isOpen={modalState.isOpen} type={modalState.type} message={modalState.message} onClose={() => setModalState({ ...modalState, isOpen: false })} />
    </div>
  );
};

export default PatientForm;
