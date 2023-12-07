import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";
import { setAlert } from './../emails.js';
import styles from "./SearchResults.module.css"
import StoreLogo from "./game/StoreLogo";
import { Snackbar } from "@mui/material";

const SearchResults = ({ results, user }) => {
  const [uniqueGameNames, setUniqueGameNames] = useState([]);
  const [open, setOpen] = useState(false);

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
            } else { // If the game is in the database
              // 1. add a row to followed_games_by_user
              supabase
                .from("followed_games_by_user")
                .insert({ user: user.id, game_id: game.gameID })
                .then((response) => {
                  if(!response.error){ // 2. Increment game follow count
                    supabase
                      .from("games")
                      .update({ follows: data[0].follows + 1})
                      .eq("id", data[0].id)
                      .then(resolve)
                      .catch(reject)
                  }
                })
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
        setAlert(game.gameID, user.email)
        setOpen(true)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
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

  const closeSnackbar = () => {
    setOpen(false)
  }

  return (
    <div className={styles.main}>
      <h2>Search Results</h2>
      <ul>
        {filteredResults.map((game, index) => (
          <li className={styles.gameListing} key={index}>
            <div className={styles.nameLogo}>
              <div className={styles.gameTitleDiv}><p className={styles.gameTitle}>{game.title}</p></div>
              <img className={styles.gameLogo} src={game.thumb} alt={game.title} />
            </div>
            <div className={styles.info}>
              <div className={styles.ratings}>
                {game.steamRatingPercent != 0 && (<p>Steam Rating {game.steamRatingPercent}%</p>)}
                {game.metacriticScore != 0 && (<p>Metacritic {game.metacriticScore}%</p>)}
              </div>
              <StoreLogo storeID={game.storeID} dealID={game.dealID} steamID={game.steamAppID}/>
              <div className={styles.priceFollowGame}>
                <div className={styles.price}>
                  {game.salePrice != game.normalPrice && (<p className={styles.strikethrough}>-{Math.round((1 - game.salePrice / game.normalPrice) * 100)}%</p>)}
                  {game.salePrice != game.normalPrice && (<p className={styles.normalPrice}><s>${game.normalPrice}</s></p>)}
                  <p className={styles.salePrice}>${game.salePrice}</p>
                </div>
                {user && (<div className={styles.followGame}><button className={styles.followButton} onClick={() => handleAddGame(game)}>Follow Game </button></div>)}
              </div>
            </div>
            <br />
          </li>
        ))}
        <li>That&#39;s it~~</li>
      </ul>
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={4000}
        message="Game followed! See profile to remove alert"
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
      />
    </div>
  );
};

export default SearchResults;
