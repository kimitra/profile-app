import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import React, { useRef, useLayoutEffect, useState } from "react";
import { useContext } from "react";
import ModeContext from "../context/ModeContext";

const Card = ({ id, name, year, major, bio, title, image, isFeatured }) => {
  const cardRef = useRef(null);
  const [isWide, setIsWide] = useState(false);
  const { mode } = useContext(ModeContext);

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
        } ${mode === "dark" ? "dark" : ""}`}
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

export default React.memo(Card);