"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";


import axios from "axios";

export default function Home() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const [loading, setLoading] = useState(false);

  const GameSearch = async (query) => {
    setSearchQuery(query); 
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/deals?title=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p id="helloworld">Hello world lmao</p>
        GAMEDEALZ
      </div>

      <div data-testid="search-bar">
        <SearchBar onSearch={GameSearch} />

        {loading ? <p>Loading...</p> : <SearchResults results={results} />}
      </div>
    </main>
  );
}
