import { client } from "./client";

export const registerByGuest = async (guestId: string) => {
  const response = await client.post("/user/guest", { guestId });
  return response.data;
};
