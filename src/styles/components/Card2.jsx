
const Card2 = () => {
    const name = "John";
    const title = "Web Designer";
    const image = "https://i.pravatar.cc/150?img=3";

    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{title}</p>
        </div>
    );
}
export default Card2;