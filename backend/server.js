import 'dotenv/config';
import express from 'express';
import { buscarTodosUsuarios, buscarUsuarioPorId } from './src/models/usuarioModel.js';
const app = express();
app.use(express.json());

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await buscarTodosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar usuários no banco." });
  }
});

// Rota para buscar um usuário específico
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));