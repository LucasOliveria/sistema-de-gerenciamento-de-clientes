import { Router } from "express";
import { ClientsController } from "../controllers/client";
import { VisitationOrderController } from "../controllers/visitation-order";
import { validateSchema } from "../middleware/validateShema";
import { registerClientSchema } from "../schema/registerClientSchema";

const routes = Router();

routes.get("/client", new ClientsController().listClients);
routes.post("/client", validateSchema(registerClientSchema), new ClientsController().registerClient);
routes.get("/visitation-order", new VisitationOrderController().getVisitationOrder);

export default routes;