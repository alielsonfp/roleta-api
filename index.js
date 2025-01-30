const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como fallback

// Middleware para permitir CORS e JSON
app.use(cors());
app.use(express.json());

// Função de embaralhamento Fisher-Yates
function fisherYatesShuffle(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled[Math.floor(Math.random() * shuffled.length)];
}

// Rota para sortear um nome
app.post("/sorteio", (req, res) => {
  const { nomes } = req.body;

  if (!nomes || !Array.isArray(nomes) || nomes.length === 0) {
    return res.status(400).json({ error: "Por favor, envie um array de nomes válido." });
  }

  const vencedor = fisherYatesShuffle(nomes);
  res.json({ vencedor });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});