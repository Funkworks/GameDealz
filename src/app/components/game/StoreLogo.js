"use client"

import { useState, useEffect } from "react";
import styles from "./StoreLogo.module.css"

const REDIRECT_URL = "https://www.cheapshark.com/redirect?dealID="
const STEAM_URL = "https://store.steampowered.com/app/"

export default function StoreLogo({ storeID, dealID, steamID }){

    const [image, setImage] = useState(null)
    const [store, setStore] = useState("")

    useEffect(() => {
      renderStores(storeID)
    }, [])

    const renderStores = (storeID) => {
        // Fetch store information from the API using promises
        fetch(`https://www.cheapshark.com/api/1.0/stores`)
          .then((response) => response.json())
          .then((storesData) => {
            // Find the store based on the provided storeID
            const relevantStore = storesData.find(
              (store) => store.storeID === storeID
            );
    
            //console.log("Store:", relevantStore);
    
            // Check if the store was found
            if (relevantStore) {
              const logo = `/logos/${relevantStore.storeID - 1}.png`
              // console.log(logo)
              setImage(logo)
              if(relevantStore.storeName === "Blizzard Shop"){
                setStore("Battle.net")
              } else {
                setStore(relevantStore.storeName)
              }
              
            } else {
              console.log("Store not found for storeID:", storeID);
              return null;
            }
          })
          .catch((error) => {
            console.error("Error loading stores", error);
          });
    };

    return (
      <div className={styles.main}>
          <div className={styles.buyNow}>
            <p>Buy now on {store}</p>
            <a href={REDIRECT_URL + dealID + "&k=1"} target="_blank">
              <img src={image} alt="Store Redirect Link"/>
            </a>
          </div>
          {store != "Steam" && steamID && 
          (<div className={styles.steam}>
            <p>View on Steam </p>
            <a href={STEAM_URL + steamID} target="_blank">
              <img src="/logos/0.png" alt="Steam Redirect Link"/>
            </a>
          </div>)}
      </div>
    )
}