import React, { useState } from 'react';
import { useQuery, useAction, searchMovies, saveSearch } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { data: movies, refetch } = useQuery(searchMovies, { title: searchTitle }, { enabled: false });
  const saveSearchFn = useAction(saveSearch);

  const handleSearch = () => {
    refetch();
    saveSearchFn({ query: searchTitle });
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <div className="flex gap-x-4 py-5">
        <input
          type="text"
          placeholder="Search for a movie"
          className="px-1 py-2 border rounded text-lg"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Search
        </button>
      </div>
      <div>
        {movies && movies.map((movie) => (
          <div
            key={movie.title}
            className="py-2 px-2 flex flex-col hover:bg-slate-100 gap-y-2 rounded"
          >
            <h2 className="text-xl font-bold">{movie.title} ({movie.year})</h2>
            {movie.poster && <img src={movie.poster} alt={movie.title} className="w-32 h-auto" />}
            <p>{movie.plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
