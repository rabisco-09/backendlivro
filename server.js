import express from "express";
import cors from "cors";
import reservasRoutes from "./routes/reservas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/reservas",reservasRoutes);
app.use("/favoritos",favoritosRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
