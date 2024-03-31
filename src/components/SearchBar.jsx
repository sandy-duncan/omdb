import { useState } from 'react';

export default function SearchBar({ onChange, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e) {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

