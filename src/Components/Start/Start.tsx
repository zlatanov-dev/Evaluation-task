import { useNavigate } from "react-router-dom";

import { endpoint } from "../../parameters/tourParams";
import styles from "./styles.module.css";
import { Loader } from "../Loader/Loader";

export function Start({ loading }: { loading: boolean }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(endpoint().tourView);
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
