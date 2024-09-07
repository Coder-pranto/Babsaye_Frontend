import { useState, useEffect } from 'react';

const TransferModal = ({ isEditing, transfer, onCreate, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    sender_or_receiver: '',
    type: '',
    account: '',
    description: '',
    credit: 0,
    debit: 0,
  });

  useEffect(() => {
    if (isEditing && transfer) {
      setFormData(transfer); // Load transfer data into form when editing
    }
  }, [isEditing, transfer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate(transfer.id, formData);
    } else {
      onCreate(formData);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* Form fields for transfer details */}
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default TransferModal;
