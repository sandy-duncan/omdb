export default function ResultsList({ results, fetchMovieDetails }) {

    if (!results) {
        return <div>No results found.</div>;
    }

    return (
        <div>
            <h3>Search Results</h3>
            {results.Search.map(({ Title, Year, imdbID, Poster }) => (
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