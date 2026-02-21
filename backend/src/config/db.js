import mysql from 'mysql2/promise';
import 'dotenv/config';

// Criamos um pool de conexões para melhor performance
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 4000,
  ssl: {
    // Essencial para TiDB Cloud e outros bancos em nuvem
    rejectUnauthorized: false 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão imediato (opcional, mas ajuda no diagnóstico)
try {
  const connection = await db.getConnection();
  console.log("✅ Conexão com o banco estabelecida com sucesso!");
  connection.release(); // Libera a conexão de volta para o pool
} catch (error) {
  console.error("❌ Erro ao conectar ao banco:", error.message);
}

export default db;