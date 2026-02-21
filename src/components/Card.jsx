import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useRef, useLayoutEffect, useState } from "react";

const Card = ({ id, name, year, major, bio, title, image, isFeatured }) => {
  const cardRef = useRef(null);
  const [isWide, setIsWide] = useState(false);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      setIsWide(width > 400);
    }
  }, []);

  return (
    <Link to={`/profile/${id}`}>
      <div
        className={`card ${isFeatured ? "featured" : ""} ${
          isWide ? "wide" : ""
        }`}
        ref={cardRef}
      >
        <img src={image} alt={name} className={styles.image} />
        <h3>{name}</h3>
        <p>{year}</p>
        <p>{major || title}</p>
        <p>{bio}</p>
      </div>
    </Link>
  );
};

export default Card;