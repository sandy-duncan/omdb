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
  const [sliderValues, setSliderValues] = useState([1970, 2024]);
  const [type, setType] = useState('any')

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSliderChange = (values) => {
    setSliderValues(values)
  }

  const handleTypeChange = (value) => {
    setType(value)
  }

  // fetch all items with search term
  const searchMovies = async () => {
    fetch(`http://www.omdbapi.com/?apikey=${VITE_API_KEY}&s=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('full data', data)
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  // fetch extra details about item by imdbID
  const fetchMovieDetails = async (imdbID) => {
    fetch(`http://www.omdbapi.com/?apikey=${VITE_API_KEY}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('individual data', data)
        setTitleResult(data)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  };

  return (
    <>
      <SearchBar
        onChange={handleSearchChange}
        onSearch={searchMovies}
        onSlide={handleSliderChange}
        onTypeChange={handleTypeChange}
        sliderValues={sliderValues}
        typeValue={type}
      />
      <ResultsList
        results={searchResults}
        fetchMovieDetails={fetchMovieDetails}
        sliderValues={sliderValues}
        typeValue={type}
      />
      <MoreDetails results={titleResult} />
    </>
  );
}

export default App;

