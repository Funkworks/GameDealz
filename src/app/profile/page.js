"use client";

import styles from "../components/mostfollowed/css/GameListing.module.css"
import supabase from "@/lib/supabase";
import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { deleteAlert, getAlert } from './../emails.js';
import axios from "axios";

export default function Page() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  var gamesData = [];

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  //If user state was updated, fetch their followed games from the database
  useEffect(() => {
    fetchFollowedGames();
  }, [user]);

  const checkIfSignedIn = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (e) {
      console.log("User not signed in");
    }
  };

  const getGameData = async (gameName) => {
    //get game id from name (I know this is a dumb solution, but whatever it's fine)
    const { data, error } = await supabase
            .from('games')
            .select()
            .eq('game_name', gameName)

    //get steamID from cheapshark
    const gameData = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);
    console.log(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);

    return gameData;
  }

  const fetchFollowedGames = async () => {
    try {
      const { data, error } = await supabase
        .from("followed_games_by_user")
        .select(
          `
                    games (
                        id,
                        game_name
                    )
                `)
                .eq('user', user.id)
            
            //TODO: Fetch game info from Cheapshark
            console.log("Data: " + data);
            setGames(data.map((game) => game.games.game_name));

            data.forEach(game => {
              console.log("game: " + game.games.game_name);
              gamesData.push(getGameData(game.games.game_name));
            });
            console.log("gamesData: " + gamesData);
        } catch (e){

        }
    }

    //remove a game from watchlist
    const handleRemoveGame = async (game) => {
        //get game id from name (I know this is a dumb solution, but whatever it's fine)
        const { data, error } = await supabase
                .from('games')
                .select()
                .eq('game_name', game)
        
        //remove game from player's followed games in database
        const response = await supabase
            .from('followed_games_by_user')
            .delete()
            .eq('user', user.id)
            .eq('game_id', data[0].id)

        //decrement game follow count from games in database
        console.log(data[0])
        const decGameFollow = await supabase
          .from('games')
          .update({ follows: data[0].follows - 1})
          .eq('id', data[0].id)
        
        console.log(JSON.stringify(response));
        
        console.log("user, user.id: " + user.id);
        console.log("game_id, data[0].id: "+ data[0].id);
        
        //get steamID from cheapshark
        const gameData = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);
        console.log(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);

        //delete alert
        console.log("gameID: " + gameData.data.info.steamAppID);
        console.log(deleteAlert(gameData.data.info.steamAppID, user.email));

        //remove list item
        document.getElementById(game).remove();
    }

    return(
        <main className={styles.main}>
            <div>
                <h1>Followed Games</h1>
                <div className={styles.gameListing}>
                    {games ? games.map((game, index) =>
                        <div id={game} key={index}> 
                            <h2>{game} <button onClick={() => handleRemoveGame(game)}>Remove</button></h2>
                        </div>
                    ) : <></>}
                </div>
            </div>
        </main>
    )
}
