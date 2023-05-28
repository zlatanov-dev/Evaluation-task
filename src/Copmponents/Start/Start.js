import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Loader } from "../Loader/Loader";
export function Start({ tourId, loading }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/v1/tours/viewer/${tourId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <h1 className={styles.heading} onClick={handleClick}>
          View Tour
        </h1>
      )}
    </>
  );
}
