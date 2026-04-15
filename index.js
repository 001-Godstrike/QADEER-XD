const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Health check route (Render needs this vibe)
app.get("/", (req, res) => {
  res.status(200).send("Godstrike Bot is alive 🚀");
});

// Simple status endpoint (debug tool)
app.get("/status", (req, res) => {
  res.json({
    status: "running",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
