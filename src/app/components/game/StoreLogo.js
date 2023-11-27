"use client"

import { useState, useEffect } from "react";

export default function StoreLogo({ storeID }){

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
    
            console.log("Store:", relevantStore);
    
            // Check if the store was found
            if (relevantStore) {
              // // Standardize the image URL for the store
              // const standardizedImage = relevantStore.images.logo;
    
              // // Do whatever you need with standardizedImage
              // console.log("Standardized Image:", standardizedImage);
    
              // const link = `https://www.cheapshark.com${standardizedImage}`
              const logo = `/logos/${relevantStore.storeID - 1}.png`
              console.log(logo)
              // return link
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
        <main>
            Store: {store}
            <img src={image} />
        </main>
        
    )
}