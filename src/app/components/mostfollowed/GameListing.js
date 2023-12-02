"use client"

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import Game from "./Game";
import styles from "./css/GameListing.module.css"

const GameListing = () => {

    const [gameList, setGameList] = useState([])

    useEffect(() => {
        fetchTopGames()
    }, [])


    const fetchTopGames = async () => {
        const {data, error} = await supabase
            .from('games')
            .select()
            .order('follows', { ascending: false })
            .limit(10)

        setGameList(data)
    }

    return (
        <div className={styles.GameListing}>
            <h2>Most Followed Games</h2>
            <ul>
                {gameList.map((game, index) => (
                    <li key={index}>
                        <Game name={game.game_name} follows={game.follows}/>
                    </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default GameListing;