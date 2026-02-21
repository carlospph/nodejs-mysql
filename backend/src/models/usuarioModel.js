import db from '../config/db.js';

// Função para buscar todos os usuários
export const buscarTodosUsuarios = async () => {
  try {
    const [rows] = await db.query('SELECT id, nome, email FROM usuarios');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Função para buscar um usuário por ID
export const buscarUsuarioPorId = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0]; // Retorna apenas o primeiro objeto
  } catch (error) {
    throw error;
  }
};