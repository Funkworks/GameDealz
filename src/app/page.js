"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import supabase from "@/lib/supabase"
import profile from "./signin";
import axios from "axios";

export default function Home() {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // This useEffect() runs at the beginning of page render because of the [] at the end
  useEffect(() => {
    UserLoggedIn();
  }, [])

  const UserLoggedIn = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (e) {
      console.log("User not signed in")
    }
  }

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut()
    window.location.reload();
  }

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
      GAMEDEALZ
      <div className={styles.description}>find the game, find the deal</div>
      {user ? 
      <div className={styles.signin}>
        <span>Signed in to {user.email}</span>
        <button onClick={() => SignOut()}>
          <h2>
            SIGN_OUT
          </h2>
        </button>
      </div> : 
      <div className={styles.signin}>
        <a href="./signin" rel="noopener noreferrer">
          <h2>
            SIGN_IN <span>-&gt;</span>
          </h2>
        </a>
      </div>}
      
      <div className={styles.grid}>
        <a
          href="./profile"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            SEARCH <span>-&gt;</span>
          </h2>
        </a>

        <a
          href="./profile"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            PROFILE <span>-&gt;</span>
          </h2>
        </a>
      </div>
      <div className={styles.search}>
        <SearchBar onSearch={GameSearch} />

        {loading ? <p>Loading...</p> : <SearchResults results={results} user={user} />}
      </div>
    </main>
  );
}
