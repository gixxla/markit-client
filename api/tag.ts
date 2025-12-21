import { client } from "./client";
import type { Tag } from "../types";

export const getTags = async (): Promise<Tag[]> => {
  const response = await client.get("/tag");
  return response.data;
};
