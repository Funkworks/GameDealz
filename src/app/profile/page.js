'use client'

import styles from "./page.module.css";
import supabase from "@/lib/supabase"
import React, { useState, useEffect } from "react";
import { deleteAlert, getAlert } from './../emails.js';
import axios from "axios";

export default function Page(){

    const [user, setUser] = useState(null);
    const [games, setGames] = useState(null);

    useEffect(() => {
        checkIfSignedIn()
    }, [])

    //If user state was updated, fetch their followed games from the database
    useEffect(() => {
        fetchFollowedGames()
    }, [user])

    const checkIfSignedIn = async () => {
        try{
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        } catch (e) {
            console.log("User not signed in")
        }
    }

    const fetchFollowedGames = async () => {
        try{
            const { data, error } = await supabase
                .from('followed_games_by_user')
                .select(`
                    games (
                        id,
                        game_name
                    )
                `)
                .eq('user', user.id)
            
            //TODO: Fetch game info from Cheapshark
            console.log("Data: " + data);
            setGames(data.map((game) => game.games.game_name));
        } catch (e){

        }
    }

    //remove a game from watchlist
    const handleRemoveGame = async (game) => {
        //remove game from player's followed games in database


        //get game id from name (I know this is a dumb solution, but whatever it's fine)
        const { data, error } = await supabase
                .from('games')
                .select('id')
                .eq('game_name', game)
        
        
        const gameData = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);
        console.log(`https://www.cheapshark.com/api/1.0/games?id=${data[0].id}`);

        //delete alert
        console.log("gameID: " + gameData.data.info.steamAppID);
        console.log(deleteAlert(gameData.data.info.steamAppID, user.email));
        getAlert(user.email);
    }
    

    return(
        <main>
            <div><a href='../'>Home</a></div>
            <div>
                <h1>Followed Games: </h1>
                <div className={styles.GameList}>
                    {games ? games.map((game, index) =>
                        <li key={index}> 
                            { game
                            /* {game.title}
                            <br></br>
                            <img src={game.thumb} />
                            <br></br>
                            Price ${game.salePrice}
                            <br></br>
                            Steam Rating {game.steamRatingPercent}%<br></br>
                            Metacritic {game.metacriticScore}%<br></br>
                            {game.cheaperStores}
                            {user ? <button onClick={() => addGameToUserDatabase(game)}>+</button> : <></>} */}
                            <br></br>
                            <button onClick={() => handleRemoveGame(game)}>X</button>
                        </li>
                    ) : <></>}
                </div>
            </div>
        </main>
    )
}