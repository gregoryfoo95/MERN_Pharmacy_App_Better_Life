import styles from "./Card.css?inline";

const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;