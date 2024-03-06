import { TClient } from "./TClient";
import { TCoordinate } from "./TCoordinate";

export type TClientsCoordsCustom = TClient & { coordinates: Omit<TCoordinate, "id" | "user_id"> }