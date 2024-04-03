import { useState, useEffect, useRef } from "react";
import "../styles/ResultsList.css"

export default function ResultsList({ results, fetchMovieDetails, sliderValues, typeValue, handleLoadMore }) {
    const [filteredResults, setFilteredResults] = useState(null);
    const [activeResult, setActiveResult] = useState();
    const tabRef = useRef();

    // filter search results
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

    // set tab focus index after load more clicked
    const setTabFocus = () => {
        tabRef.current = filteredResults.length
    }

    // set focus
    useEffect(() => {
        if (
            document.querySelector('#set-focus') &&
            (document.activeElement ==
                document.querySelector('.results-list__load-more button'))
        ) {
            document.querySelector('#set-focus').focus();
        }
    }, [filteredResults])

    // if no results, be blank
    if (!results || filteredResults === null) {
        return;
    }

    return (
        <ul className="results-list">
            <div className="results-list__total">
                Showing {filteredResults.length} of {results.totalResults} search results
            </div>
            {filteredResults.map(({ Title, Year, imdbID, Poster }, index) => (
                <li
                    key={imdbID}
                    className={`results-list__result ${activeResult === imdbID ? 'active' : ''}`}
                >
                    <div className="result__image">
                        <img src={Poster} alt="" />
                    </div>
                    <div className="result__details">
                        <a
                            href="#"
                            className="details__link stretched-link"
                            onClick={(e) => {
                                e.preventDefault();
                                fetchMovieDetails(imdbID);
                                setActiveResult(imdbID);
                            }}
                            id={index === tabRef.current ? 'set-focus' : ''}
                        >
                            {Title}
                        </a>
                        <span>{Year}</span>
                    </div>
                </li>
            ))}
            <div className="results-list__load-more">
                <button
                    onClick={() => {
                        handleLoadMore();
                        setTabFocus();
                    }}
                >
                    Load more
                </button>
            </div>
        </ul>
    );
}

