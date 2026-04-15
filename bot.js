const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");

function startBot() {
  console.log("🤖 Starting WhatsApp bot...");

  const session = process.env.SESSION_ID;

  if (!session) {
    console.log("❌ SESSION_ID missing in .env");
    return;
  }

  // decode session (important assumption)
  let authState;

  try {
    const decoded = Buffer.from(session.split(":~")[1], "base64").toString("utf-8");
    authState = JSON.parse(decoded);
  } catch (e) {
    console.log("❌ Invalid SESSION_ID format");
    return;
  }

  const sock = makeWASocket({
    auth: authState,
    printQRInTerminal: false
  });

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    console.log("🔄 Connection status:", connection);

    if (connection === "open") {
      console.log("✅ WhatsApp connected successfully!");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg.message) return;

    console.log("📩 New message:", msg.message);
  });
}

module.exports = startBot;
