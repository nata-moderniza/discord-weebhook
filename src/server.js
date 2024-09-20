const express = require("express");
const { sendToDiscord } = require("./webhookHandler");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.post("/send-message", async (req, res) => {
  const data = req.body;
  await sendToDiscord(data);
  res.status(200).send("Mensagem processada.");
});

app.post("/send-message-any-discord", async (req, res) => {
  const { url, message } = req.body;
  await sendToAnyDiscord(url, message);
  res.status(200).send("Mensagem processada.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
