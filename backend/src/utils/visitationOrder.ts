import { TClientsCoordsCustom } from "../types/TClientsCoordsCustom";

export function visitationOrder(companyCoords: { coord_x: number, coord_y: number }, clients: TClientsCoordsCustom[]) {
  let currentCoords = companyCoords;
  const visitationOrder = [];

  for (let i = 0; i < clients.length;) {
    if (clients.length === 1) {
      visitationOrder.push(clients[0])
      return visitationOrder;
    }
    const nearestClient = findNearestClient(currentCoords, clients);

    visitationOrder.push(nearestClient);

    currentCoords = nearestClient!.coordinates;

    clients = clients.filter(client => client.id !== nearestClient?.id);
  }
}

function findNearestClient(currentCoords: { coord_x: number, coord_y: number }, clients: TClientsCoordsCustom[]) {
  let nearestClient = null;
  let shortestDistance = Infinity;

  for (const client of clients) {
    const distance = Math.sqrt(Math.pow(client.coordinates.coord_x - currentCoords.coord_x, 2) + Math.pow(client.coordinates.coord_y - currentCoords.coord_y, 2));

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestClient = client;
    }
  }

  return nearestClient;
}
