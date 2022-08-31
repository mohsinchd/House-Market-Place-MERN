const express = require("express");
const app = express();

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port=${PORT}`);
});
