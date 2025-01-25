import React, { useState } from "react";
import axios from "axios";
import "../styles/PurchaseDetailsForm.css";
import Logo from "../assets/logo.png";  
const PurchaseDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    unit: "",
    price: 0,
    paymentMode: "UPI",
    billType: "Normal",
    gstn: "",
    status: "Paid",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Purchase Details:", formData);

   
    axios
      .post("https://akash-enterprises.onrender.com/api/purchase", formData)
      .then((response) => {
        console.log(response.data);
        alert("Purchase details saved successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving purchase details.");
      });
  };

  return (
    <div className="form-container">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <img src={Logo} alt="Company Logo" style={{ width: "120px", height: "auto" }} />
      </div>
      <h2 className="form-title">Purchase Details Entry</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        <div className="purchase-form-fields">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="input-field"
            ></textarea>
          </div>
          <div className="input-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Unit:</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Payment Mode:</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="UPI">UPI</option>
              <option value="Net banking">Netbanking</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className="input-group">
            <label>Bill Type:</label>
            <select
              name="billType"
              value={formData.billType}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="Normal">Normal</option>
              <option value="GST">GST</option>
            </select>
          </div>
          {formData.billType === "GST" && (
            <div className="input-group">
              <label>GSTN:</label>
              <input
                type="text"
                name="gstn"
                value={formData.gstn}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
          )}
          <div className="input-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="Paid">Paid</option>
              <option value="Non Paid">Non Paid</option>
            </select>
          </div>
          <div className="input-group" style={{flex: formData.billType === "GST" ? '0.33' : '',}}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PurchaseDetailsForm;