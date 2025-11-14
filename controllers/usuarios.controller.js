import db from '../db.js';

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: 'Campos obrigatórios' });

    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterUsuario = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await db.query('UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?', [nome, email, senha, req.params.id]);
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id=?', [req.params.id]);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
