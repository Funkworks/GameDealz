"use client"

import { useState, useEffect } from "react";
import styles from "./css/Game.module.css"

const Game = ({ name, follows, id }) => {

    return (
        <div className={styles.game}>
            <div className={styles.name}>{name}</div>
            <div className={styles.followers}>{follows}</div>
        </div>
    )
}

export default Game;