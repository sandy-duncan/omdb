import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import MoreDetails from './components/MoreDetails';
import './App.css';

const { VITE_API_KEY } = import.meta.env

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [titleResult, setTitleResult] = useState();

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const searchMovies = async () => {
    fetch(`http://www.omdbapi.com/?apikey=${VITE_API_KEY}&s=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  const fetchMovieDetails = async (imdbID) => {
    fetch(`http://www.omdbapi.com/?apikey=${VITE_API_KEY}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTitleResult(data)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  };

  return (
    <>
      <SearchBar onChange={handleSearchChange} onSearch={searchMovies} />
      <ResultsList results={searchResults} fetchMovieDetails={fetchMovieDetails} />
      <MoreDetails results={titleResult} />
    </>
  );
}

export default App;

