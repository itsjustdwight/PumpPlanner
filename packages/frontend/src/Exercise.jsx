import { useState } from "react";
import React from "react";
import { SearchBar } from "./ExComponents/SearchBar";
import { SearchResultsList } from "./ExComponents/SearchResultsList";


function App() {
 const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
          
    </div>
  );
}

export default App;
