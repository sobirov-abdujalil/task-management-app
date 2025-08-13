import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
