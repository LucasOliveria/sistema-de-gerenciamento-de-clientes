import { Request, Response } from "express";
import { knex } from "../database/connection";
import { TClient } from "../types/TClient";
import { TCoordinate } from "../types/TCoordinate";

export class ClientsController {

  async listClients(req: Request, res: Response) {
    try {
      const clients: (TClient & Omit<TCoordinate, "id" | "user_id">)[] = await knex("clients").join("coordinates", "clients.id", "coordinates.user_id").select("clients.*", "coordinates.coord_x", "coordinates.coord_y");

      let formattedClientsArray = []

      for (const client of clients) {
        const clientObject: TClient & { coordinates: Omit<TCoordinate, "id" | "user_id"> } = {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          coordinates: {
            coord_x: client.coord_x,
            coord_y: client.coord_y
          }
        }

        formattedClientsArray.push(clientObject);
      }

      res.status(200).json(formattedClientsArray);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  async registerClient(req: Request, res: Response) {
    const { name, email, phone, coord_x, coord_y } = req.body;

    try {
      const client = await knex<TClient>("clients").where({ email }).first();

      if (client) {
        return res.status(400).json({ message: "O e-mail informado já possui cadastro." })
      }
      const registeredClient = await knex<TClient>("clients").insert({ name, email, phone }).returning("*");

      const coordinate = await knex<TCoordinate>("coordinates").insert({ user_id: registeredClient[0].id, coord_x, coord_y }).returning("*");

      const clientCoordinate: TClient & { coordinates: Omit<TCoordinate, "id" | "user_id"> } = {
        ...registeredClient[0],
        coordinates: {
          coord_x: coordinate[0].coord_x,
          coord_y: coordinate[0].coord_y
        }
      }

      return res.status(201).json(clientCoordinate);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }
}