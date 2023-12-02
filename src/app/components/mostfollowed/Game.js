"use client"

import { useState, useEffect } from "react";
import styles from "./css/Game.module.css"

const Game = ({ name, follows }) => {

    return (
        <div className={styles.GameList}>
            {name}: {follows} followers
        </div>
    )
}

export default Game;