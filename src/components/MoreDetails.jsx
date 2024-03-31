export default function MoreDetails({ results }) {

    if (!results) {
        return <div>No extra results</div>;
    }

    const { Poster, Title, Rated, Year, Genre, Runtime, Actors, Plot, Ratings } = results;

    return (
        <div>
            <h3>More Details</h3>
            {/* <img src={Poster} alt={Title} /> */}
            <p>{Title}</p>
            <p>{Rated}</p>
            <p>{Year}</p>
            <p>{Genre}</p>
            <p>{Runtime}</p>
            <p>{Actors}</p>
            <p>{Plot}</p>
            {Ratings && (
                <ul>
                    {Ratings.map((rating, index) => (
                        <li key={index}>
                            {rating.Source}: {rating.Value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}