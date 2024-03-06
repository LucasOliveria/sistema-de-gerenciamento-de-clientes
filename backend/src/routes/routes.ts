import { Router } from "express";
import { ClientsController } from "../controllers/client";

const routes = Router();

routes.get("/client", new ClientsController().listClients);
routes.post("/client", new ClientsController().registerClient);

export default routes;