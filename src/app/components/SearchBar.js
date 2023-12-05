// components/SearchBar.js
"use client";

import React, { useState } from "react";
import styles from "./SearchBar.module.css"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a game..."
      />
      <button type="submit">Search</button>
    </form>
    </div>
  );
};

export default SearchBar;
