import { Request, Response } from "express";
import { knex } from "../database/connection";
import { TClientsCoords } from "../types/TClientsCoords";
import { FormatCLientArray } from "../utils/formatClientArray";
import { visitationOrder } from "../utils/visitationOrder";
import { ClientsController } from "./client";

export class VisitationOrderController extends ClientsController {

  async getVisitationOrder(_: Request, res: Response) {
    try {
      const clients: TClientsCoords[] = await knex("clients").join("coordinates", "clients.id", "coordinates.user_id").select("clients.*", "coordinates.coord_x", "coordinates.coord_y");

      const formattedClientsArray = FormatCLientArray(clients);

      const result = visitationOrder({ coord_x: 0, coord_y: 0 }, formattedClientsArray);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);

    }
  }
}