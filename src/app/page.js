"use client";
import "./globals.css";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import supabase from "@/lib/supabase";
import axios from "axios";
import GameListing from "./components/mostfollowed/GameListing";
import SideNav from "./components/SideNav";

export default function Page() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")

  // This useEffect() runs at the beginning of page render because of the [] at the end
  useEffect(() => {
    UserLoggedIn();
  }, []);

  const UserLoggedIn = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('users')
        .select(`username`)
        .eq('email', user.email)
      setUsername(data[0].username)
      setUser(user)
    } catch (e) {
      console.log("User not signed in")
    }
  }

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  };

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
      <SideNav />
      {user ? (
        <div className={styles.signin}>
          <span>Signed in to {username}</span>
          <button onClick={() => SignOut()}>
            <h2>Sign Out</h2>
          </button>
        </div>
      ) : (
        <div className={styles.signin}>
          <a href="./signin" rel="noopener noreferrer">
            <h2></h2>
          </a>
        </div>
      )}

      <div className={styles.search}>
        <GameListing />
        <SearchBar onSearch={GameSearch} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SearchResults results={results} user={user} />
        )}
      </div>
    </main>
  );
}