import { CLIENT_ID, CLIENT_SECRET } from "@/app/.settings";

export const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });

  const data = await result.json();
  return data.access_token;
};

export const getSongByISRC = async (token: string, ISRC: String) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=isrc:${ISRC}&limit=1`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data;
};
