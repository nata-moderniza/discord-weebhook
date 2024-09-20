
const axios = require('axios');

const sendToDiscord = async (data) => {
    const discordWebhookURL = process.env.DISCORD_WEBHOOK_URL;
    try {
        const response = await axios.post(discordWebhookURL, {
            content: data.message,
        });
        console.log('Mensagem enviada para o Discord:', response.status);
    } catch (error) {
        console.error('Erro ao enviar para o Discord:', error.message);
    }
};

const sendToAnyDiscord = async (url, message) => {
    try {
        const response = await axios.post(url, {
            content: message,
        });
        console.log('Mensagem enviada para o Discord:', response.status);
    } catch (error) {
        console.error('Erro ao enviar para o Discord:', error.message);
    }
};

module.exports = { sendToDiscord, sendToAnyDiscord };