import styles from "./Card.module.css";

const Card = ({ name, year, major, bio, title, image, isFeatured, mode }) => {
  return (
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
  );
};

export default Card;