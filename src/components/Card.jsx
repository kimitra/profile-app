import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, year, major, bio, title, image, isFeatured, mode }) => {
  const cardContent = (
    <Link to={`/profile/${id}`}>
    <div
      className={`
        ${styles.card}
        ${mode === "dark" ? styles.dark : ""}
        ${isFeatured ? styles.featured : ""}
      `}
    >
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>{year}</p>
      <p>{major || title}</p>
      <p>{bio}</p>
    </div>
    </Link>
  );
  if (id) {
    return <Link to={`/profile/${id}`}>{cardContent}</Link>
  }
  return cardContent;
};

export default Card;