import axios from "axios";

// Create an Axios instance with the base URL of your Node.js backend
const instance = axios.create({
  baseURL: "https://akash-enterprises.onrender.com", // Replace with your Node.js backend's base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Default headers for JSON requests
  },
});

export default instance;
