const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection string
const mongoURI = "mongodb+srv://hari123:hari123@cluster0.nkr48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Create a schema for the purchase details
const purchaseSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  unit: String,
  price: Number,
  paymentMode: String,
  billType: String,
  gstn: String,
  status: String,
  date: { type: Date, default: Date.now },
});

// Create a model from the schema
const Purchase = mongoose.model("Purchase", purchaseSchema);

// API endpoint to receive purchase details and save them to MongoDB
app.post("/api/purchase", async (req, res) => {
  try {
    const purchaseData = req.body;
    const newPurchase = new Purchase(purchaseData);
    await newPurchase.save();
    res.status(201).json({ message: "Purchase details saved successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API route to fetch all purchase details
app.get("/api/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase details" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
