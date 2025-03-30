import React from "react";

interface ModalProps {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <h3>{type === "success" ? "Success" : "Error"}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
