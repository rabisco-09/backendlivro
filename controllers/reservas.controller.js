import db from "../db.js";

export const listarReservas = async (req, res) => {
  try {
    const [reservas] = await db.query(`
      SELECT r.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
    `);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar reservas", detalhe: error.message });
  }
};

export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;

    if (!usuario_id || !livro_id || !data_retirada || !data_devolucao) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando" });
    }

    // Verifica se o livro existe e está ativo
    const [livro] = await db.query(`SELECT * FROM livros WHERE id = ? AND ativo = 1`, [livro_id]);
    if (livro.length === 0) {
      return res.status(400).json({ erro: "Livro não encontrado ou inativo" });
    }

    await db.query(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );

    res.status(201).json({ mensagem: "Reserva criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar reserva", detalhe: error.message });
  }
};

// ❌ Excluir reserva
export const excluirReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM reservas WHERE id = ?`, [id]);
    res.json({ mensagem: "Reserva excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir reserva", detalhe: error.message });
  }
};

// 🔍 Listar reservas ativas (extra)
export const listarReservasAtivas = async (req, res) => {
  try {
    const [reservas] = await db.query(`
      SELECT r.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
      WHERE r.data_devolucao >= CURDATE()
    `);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar reservas ativas", detalhe: error.message });
  }
};
