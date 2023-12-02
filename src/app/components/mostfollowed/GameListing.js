"use client"

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import Game from "./Game";
import styles from "./css/GameListing.module.css"

const GameListing = () => {

    const [gameList, setGameList] = useState()

    useEffect(() => {
        
    }, [])


    const fetchTopGames = () => {
        const {data, error} = supabase
            .from('followed_games_by_user')
            .select()
            .then(() => {
                console.log(data)
            })
    }

    return (
        <div className={styles.GameListing}>
            <h2>Most Followed Games</h2>
            <button onClick={() => fetchTopGames()}>asdasd</button>
            <Game />
        </div>
    )
}

export default GameListing;