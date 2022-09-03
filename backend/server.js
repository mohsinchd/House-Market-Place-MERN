const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
// ConfigDotenv
dotenv.config();
// Connect DB
connectDB();
// Body Parser
app.use(express.json());
// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));

// ErrorHandlers
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port=${PORT}`);
});
