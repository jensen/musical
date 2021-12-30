import { useState } from "react";

export default function Index() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <h1 className="text-white font-light text-4xl">musical.</h1>
      <h3 className="text-white font-bold text-xl">
        type in the name of an artist
      </h3>
      <form action="results" className="flex flex-col space-y-2">
        <input
          name="query"
          className="px-4 py-2 rounded-md"
          placeholder="Harris Allan"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-green-500 rounded-md disabled:opacity-50"
          disabled={query === ""}
        >
          Search
        </button>
      </form>
    </div>
  );
}
