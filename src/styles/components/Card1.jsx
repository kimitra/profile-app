const Card1 = () => {
    const name = "Ava";
    const title = "UX designer";
    const image = "https://i.pravatar.cc/150?img=5";

    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{title}</p>
        </div>
    );
}
export default Card1;