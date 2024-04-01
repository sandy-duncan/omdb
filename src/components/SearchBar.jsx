import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/SearchBar.css';

export default function SearchBar({ onChange, onSearch, onSlide, onTypeChange, sliderValues, typeValue }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e) {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  function handleSlider(values) {
    onSlide(values)
  }

  function handleType(e) {
    onTypeChange(e.target.value)
  }

  return (
    <div className="search-bar max-width-container">

      <form onSubmit={handleSubmit} className="search-bar__input">
        <input
          type="text"
          placeholder="Search for a movie..."
          aria-label="Search the online movie database"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">
          <span className="material-symbols-outlined">
            search
          </span>
        </button>
      </form>

      <div className="search-bar__filters">
        <div className="slider-filter" >
          <div className="slider-filter__label" id="sliderLabel">
            YEAR
          </div>
          <div className="slider-filter__slider" aria-labelledby="sliderLabel">
            <span>{sliderValues[0]}</span>
            <Slider
              range
              min={1900}
              max={2024}
              defaultValue={sliderValues}
              onChange={handleSlider}
            />
            <span>{sliderValues[1]}</span>
          </div>
        </div>
        <div className="type-filter">
          <fieldset>
            <legend>TYPE</legend>
            <div className="type-filter__radio">
              <input
                type="radio"
                id="any"
                name="type"
                value="any"
                checked={typeValue === "any"}
                onChange={handleType}
              />
              <label htmlFor="any">Any</label>
            </div>
            <div className="type-filter__radio">
              <input
                type="radio"
                id="movies"
                name="type"
                value="movie"
                checked={typeValue === "movie"}
                onChange={handleType}
              />
              <label htmlFor="movies">Movies</label>
            </div>
            <div className="type-filter__radio">
              <input
                type="radio"
                id="series"
                name="type"
                value="series"
                checked={typeValue === "series"}
                onChange={handleType}
              />
              <label htmlFor="series">Series</label>
            </div>
            <div className="type-filter__radio">
              <input
                type="radio"
                id="episodes"
                name="type"
                value="episodes"
                checked={typeValue === "episodes"}
                onChange={handleType}
              />
              <label htmlFor="episodes">Episodes</label>
            </div>
          </fieldset>
        </div>
      </div>

    </div>
  );
}

