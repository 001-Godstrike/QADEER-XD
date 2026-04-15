require("dotenv").config();
const express = require("express");
const startBot = require("./bot"); // 👈 IMPORTANT

const app = express();
const PORT = process.env.PORT || 3000;

// start WhatsApp bot FIRST
startBot();

app.get("/", (req, res) => {
  res.status(200).send("Godstrike Bot is alive 🚀");
});

app.get("/status", (req, res) => {
  res.json({
    status: "running",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
