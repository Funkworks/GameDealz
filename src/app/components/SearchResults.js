// components/SearchResults.js
"use client";

const SearchResults = ({ results }) => {
  if (!results.length) {
    return <p>No results found</p>;
  }

  return (
    <div>
      <h2>GAME DEALZ:</h2>
      <hr></hr>
      <hr></hr>
      <ul>
        {results.map((game) => (
          <li key={game.id}>
            {game.title}
            <br></br>
            <img src={game.thumb} />
            <br></br>
            Price ${game.salePrice}
            <br></br>
            Steam Rating {game.steamRatingPercent}%<br></br>
            Metacritic {game.metacriticScore}%<br></br>
            {game.cheaperStores}
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
