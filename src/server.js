const express = require("express");
const { sendToDiscord } = require("./webhookHandler");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.post("/send-message", async (req, res) => {
  const data = req.body;

  if (!data.message)
    res.status(500).send("Mensagem não informada.");

  await sendToDiscord(data);
  res.status(200).send("Mensagem processada.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
