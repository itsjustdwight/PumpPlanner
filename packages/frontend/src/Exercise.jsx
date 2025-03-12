import { useState } from "react";
import React from "react";
import { SearchBar } from "./ExComponents/SearchBar";
import { SearchResultsList } from "./ExComponents/SearchResultsList";
import "./Exercise.css"

function App() {
  const [results, setResults] = useState([]);
  //return (<h2>he</h2>)
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {<SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default App;
