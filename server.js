const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// API endpoint
app.get("/api/data", (req, res) => {
  // Assume we're fetching this data from MongoDB
  const data = { message: "Hello from the backend!" };
  res.json(data);
});

// Catch-all handler for all other routes (not found above),
// send back index.html to allow client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
