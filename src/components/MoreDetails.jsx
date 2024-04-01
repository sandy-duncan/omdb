import '../styles/MoreDetails.css'

export default function MoreDetails({ results, modalOpen, handleModal }) {
    if (!results) {
        return;
    }

    const { Poster, Title, Rated, Year, Genre, Runtime, Actors, Plot, Ratings } = results;

    return (
        <div className={`more-details ${modalOpen ? 'modal-active' : ''}`} aria-live="polite" role="region">
            <div className="more-details__close-modal">
                <span
                    className="material-symbols-outlined"
                    onClick={() => handleModal(false)}
                >
                    close
                </span>
            </div>
            <div className="more-details__main-details">
                <div className="main-details__image">
                    <img src={Poster} alt="" />
                </div>
                <div className="main-details__info">
                    <h1>{Title}</h1>
                    <div className="info__ratings">
                        <span className="ratings__rating">{Rated}</span>
                        <span>{Year}</span>
                        <span> &#183; {Genre} &#183; </span>
                        <span>{Runtime}</span>
                    </div>
                    <span>{Actors}</span>
                </div>
            </div>
            <div className="more-details__plot">
                <p>{Plot}</p>
            </div>
            {Ratings && (
                <div className="more-details__audience-ratings">
                    {Ratings.map((rating, index) => (
                        <div key={index} className="audience-ratings__rating">
                            <div>{rating.Value}</div>
                            <div>{rating.Source}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}