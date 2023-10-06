// pages/api/searchGame.js

import axios from "axios";

<SearchResults results={results} currentQuery={searchQuery} />;


export default async (req, res) => {
  if (req.method === "GET") {
    const query = res.query.title;

    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/games?title=${query}`
      );
      res.status(200).json(response.data);
      console.log(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
      console.log(error);
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
