import { client } from "./client";

export const registerAnonymous = async (anonymousId: string) => {
  const response = await client.post("/user/anonymous", { anonymousId });
  return response.data;
};
