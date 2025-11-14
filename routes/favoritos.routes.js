import express from "express";
import {
  listarFavoritos,
  criarFavorito,
  excluirFavorito,
  listarFavoritosUsuario
} from "../controllers/favoritos.controller.js";

const router = express.Router();

router.get("/favoritos", listarFavoritos);
router.get("/favoritos/usuario/:id", listarFavoritosUsuario);
router.post("/favoritos", criarFavorito);
router.delete("/favoritos/:id", excluirFavorito);

export default router;
