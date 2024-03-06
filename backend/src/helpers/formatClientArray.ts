import { TClientsCoords } from "../types/TClientsCoords";
import { TClientsCoordsCustom } from "../types/TClientsCoordsCustom";

export function FormatCLientArray(clients: TClientsCoords[]): TClientsCoordsCustom[] {
  let formattedClientsArray: TClientsCoordsCustom[] = []

  for (const client of clients) {
    const clientObject: TClientsCoordsCustom = {
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
  return formattedClientsArray
}