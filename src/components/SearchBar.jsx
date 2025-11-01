import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm === '') return;
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white rounded-full shadow-2xl p-3 flex items-center gap-3">
      <input
        type="text"
        placeholder="🔍 Search by Source IP..."
        value={searchTerm}
        onChange={handleSearch}
        className="flex-1 px-6 py-3 text-lg outline-none"
      />
      {searchTerm && (
        <button 
          onClick={() => { setSearchTerm(''); onSearch(''); }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold transition-all duration-300 hover:rotate-90"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
