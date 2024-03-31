import { useState, useEffect } from "react";

export default function ResultsList({ results, fetchMovieDetails, sliderValues, typeValue }) {
    const [filteredResults, setFilteredResults] = useState(null);

    useEffect(() => {
        if (!results || !results.Search) return;

        const filtered = results.Search.filter(({ Year, Type }) => {
            const year = parseInt(Year);
            if (typeValue === 'any') {
                return (year >= sliderValues[0] && year <= sliderValues[1])
            }
            return (year >= sliderValues[0] && year <= sliderValues[1]) && Type === typeValue;
        });
        console.log('filtered results', filtered)
        setFilteredResults(filtered);
    }, [results, sliderValues, typeValue]);

    if (!results) {
        return <div>No results found.</div>;
    }

    if (filteredResults === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Search Results ({filteredResults.length})</h3>
            {filteredResults.map(({ Title, Year, imdbID, Poster }) => (
                <div key={imdbID}>
                    <p>{Title}</p>
                    <p>Year: {Year}</p>
                    {/* <img src={Poster} alt={Title} /> */}
                    <button onClick={() => fetchMovieDetails(imdbID)}>View Details</button>
                </div>
            ))}
        </div>
    );
}