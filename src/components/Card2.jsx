
const Card2 = () => {
    const name = "John";
    const title = "Web Designer";
    const image = "https://randomuser.me/api/portraits/men/32.jpg";

    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{title}</p>
        </div>
    );
}
export default Card2;