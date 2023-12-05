"use client"

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import Game from "./Game";
import styles from "./css/GameListing.module.css"
import { IoIosRefresh } from "react-icons/io";

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
        <div className={styles.gameListing}>
            <div className={styles.title}>
                <h2>Most Followed Games</h2>
                <button className={styles.refreshButton} onClick={()=>fetchTopGames()}><IoIosRefresh className={styles.refreshIcon}/></button>
            </div>
            <ul>
                {gameList.map((game, index) => (
                    <li key={index}>
                        <Game name={game.game_name} follows={game.follows} id={game.id}/>
                    </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default GameListing;