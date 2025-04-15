"use client";

import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("/api/parse-query", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data);
  }

  return <div>
    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
    <button onClick={handleSearch}>Search</button>
  </div>;
};

export default Search;
