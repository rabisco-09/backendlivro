import express from 'express';
import {
  criarUsuario,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controllers/usuarios.controller.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', obterUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

export default router;
