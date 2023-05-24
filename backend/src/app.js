const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process'); // para executar comandos shell

const router = require('./router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
console.log("Deu certo")
// adicionando o endpoint de webhook
app.post('/webhook', (req, res) => {
  // Aqui você pode verificar a assinatura do webhook para garantir que a solicitação é legítima

  // Puxe as últimas mudanças do repositório Git
  execSync('git pull', { stdio: 'inherit' });

  // Reinicie o servidor
  // Seu método de reiniciar o servidor dependerá de como você está gerenciando seu servidor Node.js

  res.sendStatus(200);  // Responda ao webhook para que o Git saiba que ele foi recebido corretamente
});

module.exports = app;