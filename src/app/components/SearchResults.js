import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";

const SearchResults = ({ results, user }) => {
  const [uniqueGameNames, setUniqueGameNames] = useState([]);

  useEffect(() => {
    // Clear the array of unique game names when the results change
    setUniqueGameNames([]);
  }, [results]);

  const addGameToUserDatabase = (game) => {
    // Return a promise to handle asynchronous behavior
    return new Promise((resolve, reject) => {
      // Check if the game name is not in the array of unique game names
      if (!uniqueGameNames.includes(game.title)) {
        // Add the game name to the array to mark it as processed
        setUniqueGameNames([...uniqueGameNames, game.title]);

        // If no results for the game name found, add a new game to the database
        supabase
          .from("games")
          .select()
          .eq("game_name", game.title)
          .then(({ data, error }) => {
            console.log(data);

            if (data.length === 0) {
              // Use the insert method without async/await
              supabase
                .from("games")
                .insert({ id: game.gameID, game_name: game.title })
                .then(() => {
                  // Add a row to followed_games_by_user, joining gameId and userId
                  supabase
                    .from("followed_games_by_user")
                    .insert({ user: user.id, game_id: game.gameID })
                    .then(resolve) // Resolve the promise when the operations are complete
                    .catch(reject); // Reject the promise if there's an error
                })
                .catch(reject);
            } else {
              // If the game is in the database, add a row to followed_games_by_user
              supabase
                .from("followed_games_by_user")
                .insert({ user: user.id, game_id: game.gameID })
                .then(resolve)
                .catch(reject);
            }
          })
          .catch(reject);
      } else {
        // If the game name is already in the array, resolve the promise
        resolve();
      }
    });
  };

  const handleAddGame = (game) => {
    // Use the then method to handle the promise
    addGameToUserDatabase(game)
      .then(() => {
        // Any additional logic after adding the game
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  const renderStores = (storeID) => {
    // Fetch store information from the API using promises
    fetch(`https://www.cheapshark.com/img/stores/logos/0.png`)
      .then((response) => response.json())
      .then((storesData) => {
        // Find the store based on the provided storeID
        const relevantStore = storesData.find(
          (store) => store.storeID === storeID
        );

        console.log("Store:", relevantStore);

        // Check if the store was found
        if (relevantStore) {
          // Standardize the image URL for the store
          const standardizedImage = relevantStore.images.logo;

          // Do whatever you need with standardizedImage
          console.log("Standardized Image:", standardizedImage);

          return (
            <img
              src={`https://www.cheapshark.com/img/stores/logos/0.png`}
              alt={game.title}
            />
          );
        } else {
          console.log("Store not found for storeID:", storeID);
          return null;
        }
      })
      .catch((error) => {
        console.error("Error loading stores", error);
      });
  };

  const filteredResults = results.reduce((uniqueResults, game) => {
    // Check if the game name is not already in uniqueResults
    if (!uniqueResults.some((uniqueGame) => uniqueGame.title === game.title)) {
      return [...uniqueResults, game];
    }
    return uniqueResults;
  }, []);

  if (!filteredResults.length) {
    return <p>No results found</p>;
  }

  return (
    <div>
      <h2>GAME HUNT:</h2>
      <hr />
      <hr />
      <ul>
        {filteredResults.map((game, index) => (
          <li key={index}>
            {game.title}
            <br />
            <img src={game.thumb} alt={game.title} />
            <br />
            Price ${game.salePrice}
            <br />
            Steam Rating {game.steamRatingPercent}%
            <br />
            Metacritic {game.metacriticScore}%
            <br />
            {renderStores(game.storeID)}{" "}
            {user ? (
              <button onClick={() => handleAddGame(game)}>+</button>
            ) : (
              <></>
            )}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
