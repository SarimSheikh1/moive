import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getSearchHistory } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const SearchHistoryPage = () => {
  const { data: searches, isLoading, error } = useQuery(getSearchHistory);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Search History</h1>
      <div className='bg-white shadow-md rounded-lg p-4'>
        {searches.length === 0 && (
          <p className='text-gray-500'>No search history available.</p>
        )}
        {searches.map((search) => (
          <div key={search.id} className='mb-4'>
            <p className='text-lg font-semibold'>{search.query}</p>
            <p className='text-sm text-gray-500'>Searched on: {new Date(search.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <Link to='/' className='text-blue-500 hover:underline mt-4 block'>
        Back to Home
      </Link>
    </div>
  );
}

export default SearchHistoryPage;
