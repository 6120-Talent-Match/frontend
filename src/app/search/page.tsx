"use client";

import { useState } from "react";
import { SearchResult } from "@/types/resume";

const Search = () => {
  const [query, setQuery] = useState("");
  const [augmentedSkills, setAugmentedSkills] = useState<string[]>([]);
  const [augmentedExperience, setAugmentedExperience] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setAugmentedSkills([]);
    setAugmentedExperience([]);
    setResults([]);
    try {
      const parsedRes = await fetch("/api/parse-query", {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const parsedResData = await parsedRes.json();
      const parsedData = JSON.parse(parsedResData.data);

      setAugmentedSkills(parsedData.skills);
      setAugmentedExperience(parsedData.experience);
      const searchRes = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          skills: parsedData.skills,
          experience: parsedData.experience,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const searchResData = await searchRes.json();
      console.log(searchResData);
      setResults(searchResData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return <div className="w-full flex flex-col items-center gap-4">
    <p className="mt-4 text-2xl font-bold">Talent Search Engine</p>
    <p className="text-gray-500">Please describe the position or the skills you are looking for</p>
    <div className="w-full flex items-center justify-center gap-4 py-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded-md" />
      <button
        onClick={handleSearch}
        className={`cursor-pointer ${loading ? "bg-gray-500" : "bg-black"} text-white p-2 rounded-md`}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
    {augmentedSkills.length > 0 && (
      <div className="w-full flex flex-col gap-4 border p-4 rounded-md">
        <h2 className="text-lg font-bold">Query Augmentation</h2>
        <p>Skills: {augmentedSkills.join(", ")}</p>
        <p>Experience: {augmentedExperience.join(", ")}</p>
      </div>
    )}
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {results.map((result) => (
        <div key={result.id} className="w-full border p-4 mb-4 rounded">
          <h2 className="text-lg font-bold">{result.id}</h2>
          <h3 className="font-bold">Category: {result.category}</h3>
          <p className="font-bold">Similarity: {(result.similarity_score * 100).toFixed(1)}%</p>

          <div className="mt-2">
            <h4 className="font-semibold">Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {result.skills.map((skill: string) => (
                <span key={skill} className="bg-gray-100 px-2 py-1 rounded-md">{skill}</span>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <h4 className="font-semibold">Education:</h4>
            <ul className="list-disc pl-5">
              {result.education.map((edu: string) => (
                <li key={edu}>{edu}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="font-semibold">Experience:</h4>
            <ul className="list-disc pl-5">
              {result.experience.map((exp: string) => (
                <li key={exp}>{exp}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>;
};

export default Search;
