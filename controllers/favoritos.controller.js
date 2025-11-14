import db from "../db.js";

// 📋 Listar todos os favoritos
export const listarFavoritos = async (req, res) => {
  try {
    const [favoritos] = await db.query(`
      SELECT f.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM favoritos f
      JOIN usuarios u ON f.usuario_id = u.id
      JOIN livros l ON f.livro_id = l.id
    `);
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar favoritos", detalhe: error.message });
  }
};

// ➕ Criar favorito
export const criarFavorito = async (req, res) => {
  try {
    const { usuario_id, livro_id } = req.body;

    if (!usuario_id || !livro_id) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando" });
    }

    const [livro] = await db.query(`SELECT * FROM livros WHERE id = ? AND ativo = 1`, [livro_id]);
    if (livro.length === 0) {
      return res.status(400).json({ erro: "Livro não encontrado ou inativo" });
    }

    await db.query(`INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)`, [usuario_id, livro_id]);
    res.status(201).json({ mensagem: "Livro adicionado aos favoritos!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar favorito", detalhe: error.message });
  }
};

// ❌ Excluir favorito
export const excluirFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM favoritos WHERE id = ?`, [id]);
    res.json({ mensagem: "Favorito removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir favorito", detalhe: error.message });
  }
};

// 🔍 Listar favoritos de um usuário (extra)
export const listarFavoritosUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [favoritos] = await db.query(`
      SELECT f.*, l.titulo, l.autor
      FROM favoritos f
      JOIN livros l ON f.livro_id = l.id
      WHERE f.usuario_id = ?
    `, [id]);
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar favoritos do usuário", detalhe: error.message });
  }
};
