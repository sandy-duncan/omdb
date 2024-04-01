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
  const [sliderValues, setSliderValues] = useState([1950, 2024]);
  const [type, setType] = useState('any');
  const [modalOpen, setModalOpen] = useState();

  // handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSliderChange = (values) => {
    setSliderValues(values)
  }

  const handleTypeChange = (value) => {
    setType(value)
  }

  const handleModalChange = (value) => {
    setModalOpen(value)
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
    fetch(`http://www.omdbapi.com/?apikey=${VITE_API_KEY}&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        console.log('individual data', data)
        setTitleResult(data)
        handleModalChange(true)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  };

  return (
    <>
      <header>
        <SearchBar
          onChange={handleSearchChange}
          onSearch={searchMovies}
          onSlide={handleSliderChange}
          onTypeChange={handleTypeChange}
          sliderValues={sliderValues}
          typeValue={type}
        />
      </header>
      <main className="max-width-container">
        <ResultsList
          results={searchResults}
          fetchMovieDetails={fetchMovieDetails}
          sliderValues={sliderValues}
          typeValue={type}
        />
        <MoreDetails
          results={titleResult}
          modalOpen={modalOpen}
          handleModal={handleModalChange}
        />
      </main>
    </>
  );
}

export default App;

