import React, { useState } from 'react';
import axios from 'axios';

const Carform = ({ onCarAdded }) => {
  const [formData, setFormData] = useState({
    Name: '',
    MobileNumber: '',
    carNumber: '',
    cngKitNumber: '',
    cngKitModelName: '',
    fittingDate: '',
    lastServiceDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://manixmotorscngbackend.onrender.com/add-row', formData)
      .then(() => {
        alert("✅ Car data saved to Google Sheet!");
        setFormData({
          Name: '',
          MobileNumber: '',
          carNumber: '',
          cngKitNumber: '',
          cngKitModelName: '',
          fittingDate: '',
          lastServiceDate: ''
        });
        if (onCarAdded) onCarAdded();
      })
      .catch(error => {
        console.error('❌ Error saving car:', error);
        alert("❌ Failed to save car data.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" className="form-control mb-2" required />
        <input type="text" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange} placeholder="Mobile Number" className="form-control mb-2" required />
        <input type="text" name="carNumber" value={formData.carNumber} onChange={handleChange} placeholder="Car Number" className="form-control mb-2" required />
        <input type="text" name="cngKitNumber" value={formData.cngKitNumber} onChange={handleChange} placeholder="CNG Kit Number" className="form-control mb-2" />
        <input type="text" name="cngKitModelName" value={formData.cngKitModelName} onChange={handleChange} placeholder="Kit Model" className="form-control mb-2" />
        <input type="date" name="fittingDate" value={formData.fittingDate} onChange={handleChange} className="form-control mb-2" required />
        <input type="date" name="lastServiceDate" value={formData.lastServiceDate} onChange={handleChange} className="form-control mb-2" required />
        <button type="submit" className="btn btn-success">Save Car</button>
      </form>
    </div>
  );
};

export default Carform;
