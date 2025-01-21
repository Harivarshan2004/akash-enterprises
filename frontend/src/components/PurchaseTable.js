// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf"; 
// import "react-datepicker/dist/react-datepicker.css";
// import "../styles/PurchaseTable.css"; 

// const PurchaseTable = () => {
//   const [purchaseData, setPurchaseData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/purchase"); 
//         setPurchaseData(response.data);
//         setFilteredData(response.data); 
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleRowSelection = (id) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === filteredData.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(filteredData.map((item) => item._id));
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     const selectedData = filteredData.filter((item) => selectedRows.includes(item._id));
  
//     if (selectedData.length === 0) {
//       alert("Please select at least one row to generate the PDF!");
//       return;
//     }
  
//     // Header
//     doc.setFontSize(16);
//     doc.text("INVOICE", 105, 15, null, null, "center");
  
//     // Invoice Details Section
//     doc.setFontSize(10);
//     doc.text("Invoice No.", 10, 30);
//     doc.text("Date", 10, 40);
//     doc.text("Ship Via", 105, 30);
//     doc.text("Terms", 105, 40);
//     doc.rect(35, 25, 60, 20); 
//     doc.rect(130, 25, 60, 20); 
  
//     // Bill To / Ship To Section
//     doc.text("Bill To", 10, 60);
//     doc.text("Ship To", 105, 60);
//     doc.rect(10, 65, 80, 30); 
//     doc.rect(105, 65, 80, 30); 
  
//     // Table Header
//     const tableTop = 110;
//     doc.setFontSize(8);
//     doc.text("No.", 10, tableTop);
//     doc.text("Name", 20, tableTop);
//     doc.text("Description", 50, tableTop);
//     doc.text("Quantity", 100, tableTop);
//     doc.text("Unit", 120, tableTop);
//     doc.text("Price", 140, tableTop);
//     doc.text("Payment Mode", 160, tableTop);
//     doc.text("Bill Type", 190, tableTop);
//     doc.text("GSTN", 220, tableTop);
//     doc.text("Status", 260, tableTop);
//     doc.text("Date", 290, tableTop);
//     doc.line(10, tableTop + 2, 290, tableTop + 2); 
  
//     // Table Data
//     let y = tableTop + 10;
//     let total = 0;
  
//     selectedData.forEach((item, index) => {
//       const amount = item.quantity * item.price;
//       total += amount; 
  
//       doc.text(`${index + 1}`, 10, y);
//       doc.text(item.name, 20, y);
//       doc.text(item.description, 50, y);
//       doc.text(item.quantity.toString(), 100, y);
//       doc.text(item.unit, 120, y);
//       doc.text(item.price.toFixed(2), 140, y, null, null, "right");
//       doc.text(item.paymentMode, 160, y);
//       doc.text(item.billType, 190, y);
//       doc.text(item.billType === "GST" ? item.gstn : "N/A", 220, y);
//       doc.text(item.status, 260, y);
//       doc.text(new Date(item.date).toLocaleDateString(), 290, y);
  
//       y += 10;
  
//       // Page Break Handling
//       if (y > 270) {
//         doc.addPage();
//         y = 20;
//         doc.text("No.", 10, y);
//         doc.text("Name", 20, y);
//         doc.text("Description", 50, y);
//         doc.text("Quantity", 100, y);
//         doc.text("Unit", 120, y);
//         doc.text("Price", 140, y);
//         doc.text("Payment Mode", 160, y);
//         doc.text("Bill Type", 190, y);
//         doc.text("GSTN", 220, y);
//         doc.text("Status", 260, y);
//         doc.text("Date", 290, y);
//         doc.line(10, y + 2, 290, y + 2); 
//         y += 10;
//       }
//     });
  
//     // Total
//     doc.line(10, y, 290, y); 
//     doc.text("Total", 140, y + 10);
//     doc.text(total.toFixed(2), 180, y + 10, null, null, "right");
  
//     // Save the PDF
//     doc.save("invoice.pdf");
//   };
  
//   const filterByDate = () => {
//     if (!selectedDate) {
//       alert("Please select a date!");
//       return;
//     }

//     const filtered = purchaseData.filter((item) => {
//       const itemDate = new Date(item.date).toDateString();
//       return itemDate === selectedDate.toDateString();
//     });

//     setFilteredData(filtered); 
//   };

//   if (loading) {
//     return <div className="loader">Loading...</div>; 
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="table-container">
//       <h2>Purchase Details</h2>
//         <input
//           type="date"
//           onChange={(e) => setSelectedDate(new Date(e.target.value))}
//         />
//         <button onClick={filterByDate}>Filter by Date</button>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={selectedRows.length === filteredData.length}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Unit</th>
//             <th>Price</th>
//             <th>Payment Mode</th>
//             <th>Bill Type</th>
//             <th>GSTN</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((purchase) => (
//             <tr key={purchase._id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.includes(purchase._id)}
//                   onChange={() => handleRowSelection(purchase._id)}
//                 />
//               </td>
//               <td>{purchase.name}</td>
//               <td>{purchase.description}</td>
//               <td>{purchase.quantity}</td>
//               <td>{purchase.unit}</td>
//               <td>{purchase.price}</td>
//               <td>{purchase.paymentMode}</td>
//               <td>{purchase.billType}</td>
//               <td>{purchase.billType === "GST" ? purchase.gstn : "N/A"}</td>
//               <td>{purchase.status}</td>
//               <td>{new Date(purchase.date).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="buttonpdf"><button onClick={generatePDF}>Generate PDF</button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/PurchaseTable.css";

const PurchaseTable = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchase");
        setPurchaseData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item._id));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const selectedData = filteredData.filter((item) => selectedRows.includes(item._id));

    if (selectedData.length === 0) {
      alert("Please select at least one row to generate the PDF!");
      return;
    }

    // Table Headers
    const tableHeaders = [
      "No.",
      "Name",
      "Description",
      "Quantity",
      "Unit",
      "Price",
      "Payment Mode",
      "Bill Type",
      "GSTN",
      "Status",
      "Date",
    ];

    // Table Rows
    const tableRows = selectedData.map((item, index) => [
      index + 1,
      item.name,
      item.description,
      item.quantity,
      item.unit,
      item.price.toFixed(2),
      item.paymentMode,
      item.billType,
      item.billType === "GST" ? item.gstn : "N/A",
      item.status,
      new Date(item.date).toLocaleDateString(),
    ]);

    // Add Invoice Header
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 15, null, null, "center");

    // Add Table
    doc.autoTable({
      head: [tableHeaders],
      body: tableRows,
      startY: 30, // Position table below the header
      theme: "grid", // Adds grid lines
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [22, 160, 133], // Header background color
        textColor: 255, // Header text color
      },
      margin: { top: 10 },
    });

    // Calculate Total
    const total = selectedData.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Add Total Section
    const finalY = doc.lastAutoTable.finalY + 10; // Get the last Y position after the table
    doc.setFontSize(10);
    doc.text(`Total: ${total.toFixed(2)}`,180,finalY, "right");

    // Save the PDF
    doc.save("invoice.pdf");
  };

  const filterByDate = () => {
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }

    const filtered = purchaseData.filter((item) => {
      const itemDate = new Date(item.date).toDateString();
      return itemDate === selectedDate.toDateString();
    });

    setFilteredData(filtered);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Purchase Details</h2>
      <input type="date" onChange={(e) => setSelectedDate(new Date(e.target.value))} />
      <button onClick={filterByDate}>Filter by Date</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredData.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Payment Mode</th>
            <th>Bill Type</th>
            <th>GSTN</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((purchase) => (
            <tr key={purchase._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(purchase._id)}
                  onChange={() => handleRowSelection(purchase._id)}
                />
              </td>
              <td>{purchase.name}</td>
              <td>{purchase.description}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.unit}</td>
              <td>{purchase.price}</td>
              <td>{purchase.paymentMode}</td>
              <td>{purchase.billType}</td>
              <td>{purchase.billType === "GST" ? purchase.gstn : "N/A"}</td>
              <td>{purchase.status}</td>
              <td>{new Date(purchase.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonpdf">
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </div>
  );
};

export default PurchaseTable;
