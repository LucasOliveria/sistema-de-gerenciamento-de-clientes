import { TClient } from "./TClient";
import { TCoordinate } from "./TCoordinate";

export type TClientsCoords = TClient & Omit<TCoordinate, "id" | "user_id">