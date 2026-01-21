const Card1 = () => {
    const name = "Ava";
    const title = "UX designer";
    const image = "https://randomuser.me/api/portraits/women/45.jpg";

    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{title}</p>
        </div>
    );
}
export default Card1;