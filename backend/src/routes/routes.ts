import { Router } from "express";
import { ClientsController } from "../controllers/client";
import { VisitationOrderController } from "../controllers/visitation-order";

const routes = Router();

routes.get("/client", new ClientsController().listClients);
routes.post("/client", new ClientsController().registerClient);
routes.get("/visitation-order", new VisitationOrderController().getVisitationOrder);

export default routes;