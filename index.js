import 'dotenv/config';
import express from 'express';
import { UsuarioModel } from './src/Models/UsuarioModel.js';

const app = express();
app.use(express.json());

// GET - Listar
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await UsuarioModel.buscarTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// POST - Criar
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const id = await UsuarioModel.criar(nome, email, senha);
    res.status(201).json({ id, nome, email });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// PUT - Editar
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    await UsuarioModel.atualizar(id, nome, email, senha);
    res.json({ message: "Atualizado!" });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

// DELETE - Remover
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await UsuarioModel.deletar(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
});

app.listen(3000, () => console.log('🚀 API com Model rodando!'));