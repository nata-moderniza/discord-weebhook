const express = require("express");
const { sendToDiscord, sendToAnyDiscord } = require("./webhookHandler");

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

app.post('/github-webhook', async (req, res) => {
  const githubEvent = req.headers['x-github-event'];
  const payload = req.body;

  if (githubEvent === 'push') {
    const commitMessages = payload.commits.map(commit => commit.message).join('\n');
    const repositoryName = payload.repository.full_name;
    const pusherName = payload.pusher.name;

    const message = `Repositório: ${repositoryName}\nPush realizado por: ${pusherName}\nCommits:\n${commitMessages}`;

    await sendToAnyDiscord("https://weebhookbeta", message);
    res.status(200).send('Notificação do GitHub processada.');
  } else {
    res.status(400).send('Evento não suportado.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
