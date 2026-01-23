const Card = ({image, name, year, major, isFeatured}) => {
    

    return (
        <div className={`card ${isFeatured ? "featured" : ""}`}>
            <img src={image} alt={name} className="card-img" />
            <h3>{name}</h3>
            <p>Year: {year}</p>
            <p>Major: {major}</p>

            {isFeatured && <p className="badge">Featured</p>}
        </div>
    );
};
export default Card;