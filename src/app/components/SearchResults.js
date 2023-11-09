// components/SearchResults.js
"use client";

import supabase from "@/lib/supabase"
import { useState, useEffect } from "react";

const SearchResults = ({ results, user }) => {

  const addGameToUserDatabase = async (game) => {
    try{
      const { data, error } = await supabase
        .from('games')
        .select()
        .eq('id', game.gameID)
      
      console.log(data)

      if(data.length === 0){ //If no results for game found, add new game to database
        const { data, error } = await supabase
          .from('games')
          .insert({ id: game.gameID, game_name: game.title})
        followGame(game)
      } else { //If game in database, add row to followed_games_by_user, joining gameId and userId
        followGame(game)
      }
      
    } catch (e) {
      console.error(e)
    }
  }

  const followGame = async (game) => {
    const { data, error } = await supabase
      .from('followed_games_by_user')
      .insert({ user: user.id, game_id: game.gameID })
  }

  if (!results.length) {
    return <p>No results found</p>;
  }

  return (
    <div>
      <h2>GAME DEALZ:</h2>
      <hr></hr>
      <hr></hr>
      <ul>
        {results.map((game, index) => (
          // "index" is just an incrementor, which allows the unique key React wants for rendering components
          <li key={index}> 
            {game.title}
            <br></br>
            <img src={game.thumb} />
            <br></br>
            Price ${game.salePrice}
            <br></br>
            Steam Rating {game.steamRatingPercent}%<br></br>
            Metacritic {game.metacriticScore}%<br></br>
            {game.cheaperStores}
            {user ? <button onClick={() => addGameToUserDatabase(game)}>+</button> : <></>}
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
