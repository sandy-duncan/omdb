import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    <>
      <span>{sliderValues[0]}</span>
      <Slider
        range
        min={1900}
        max={2024}
        defaultValue={sliderValues}
        onChange={handleSlider}
      />
      <span>{sliderValues[1]}</span>

      <fieldset>
        <legend>Type</legend>
        <div>
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
        <div>
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
        <div>
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
        <div>
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

