'use client'

import styles from "./page.module.css";
import supabase from "@/lib/supabase"
import React, { useState, useEffect } from "react";

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
            
            //TODO: Fetch game info from Cheapspark
            setGames(data.map((game) => game.games.game_name))
        } catch (e){

        }
    }
    

    return(
        <main>
            <div><a href='../init'>Home</a></div>
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
                        </li>
                    ) : <></>}
                </div>
            </div>
        </main>
    )
}