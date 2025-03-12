import { useState } from "react";
import React from "react";
import { SearchBar } from "./ExComponents/SearchBar";
import { SearchResultsList } from "./ExComponents/SearchResultsList";


function InfoBoxesList() {
  return (
    <div>
      {data.map((item) => (
        <InfoBox key={item.id} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

function App() {
 const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
          <div></div>
    </div>
  );
}

export default App;
