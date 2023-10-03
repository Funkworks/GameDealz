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
      <ul>
        {results.map((game) => (
          <li key={game.id}>
            {game.title} - ${game.salePrice} - metacritic - 
            { game.metacriticScore }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
