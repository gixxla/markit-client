import { client } from "./client";

export const registerAsGuest = async (guestId: string) => {
  const response = await client.post("/user/guest", { guestId });
  return response.data;
};
