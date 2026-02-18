import db from '../Configuration/db.js';

export const UsuarioModel = {
  // Buscar todos
  buscarTodos: async () => {
    const [rows] = await db.execute('SELECT id, nome, email FROM usuarios');
    return rows;
  },

  // Criar um novo
  criar: async (nome, email, senha) => {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    return result.insertId;
  },

  // Atualizar
  atualizar: async (id, nome, email, senha) => {
    return await db.execute(
      'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
      [nome, email, senha, id]
    );
  },

  // Deletar
  deletar: async (id) => {
    return await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  }
};