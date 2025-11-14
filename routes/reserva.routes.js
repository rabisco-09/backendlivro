import express from "express";
import {
  listarReservas,
  criarReserva,
  excluirReserva,
  listarReservasAtivas
} from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/reservas", listarReservas);
router.get("/reservas/ativas", listarReservasAtivas);
router.post("/reservas", criarReserva);
router.delete("/reservas/:id", excluirReserva);

export default router;
