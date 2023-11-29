"use client"

import { useState, useEffect } from "react";
import styles from "./storeLogo.module.css";

const REDIRECT_URL = "https://www.cheapshark.com/redirect?dealID="

export default function StoreLogo({ storeID, dealID }){

    const [image, setImage] = useState(null)
    const [store, setStore] = useState("")

    useEffect(() => {
      renderStores(storeID)
      console.log(dealID)
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
              setStore(relevantStore.storeName)
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
          Store: {store}
          <a href={REDIRECT_URL + dealID + "&k=1"}><img src={image} /></a>
      </div>
    )
}