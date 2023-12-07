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
  const [option, setOption] = useState("salePrice")

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
      await setResults(response.data);
      //Result sort option
      var selectElement = document.getElementById('sort');
      selectElement.value = '';
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  const TypeSort = (property) => (a, b) => {
    const valueA = a[property];
    const valueB = b[property];
  
    if(property !== "title" && property !== "salePrice"){
      if (valueA < valueB) {
        return 1;
      } else if (valueA > valueB) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const SortList = (option) => {
    setOption(option)
    if(results){
      let tempResults = results.slice()
      tempResults.sort(TypeSort(option))
      setResults(tempResults)
    } else{
      return
    }
  }

  return (
    <main className={styles.main}>
      <SideNav />
      {user ? (
        <div className={styles.signin}>
          Signed in to <span>{username}</span>
          <button onClick={() => SignOut()}>
            <h2>Sign Out</h2>
          </button>
        </div>
      ) : (
        <div className={styles.signin}>
          <a href="./signin" rel="noopener noreferrer">
            Sign in to get alerted when games go on sale!
          </a>
        </div>
      )}

      <div className={styles.search}>
        <GameListing />
        <SearchBar onSearch={GameSearch} />
        <div>
          <select name="sort" id="sort" defaultValue="" onChange={e => SortList(e.target.value)}>
            <option value="" disabled>Sort Games</option>
            <option value="salePrice">Cheapest</option>
            <option value="savings">Sale</option>
            <option value="title">Alphabetical</option>
            <option value="steamRatingPercent">Steam Rating</option>
            <option value="metacriticScore">Metacritic Rating</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SearchResults results={results} user={user} />
        )}
      </div>
    </main>
  );
}