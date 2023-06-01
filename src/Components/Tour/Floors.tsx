import { Structure } from '../../Types/types';
import styles from './styles.module.css';

export function Floors({ floor, onLiClick } : { floor: Structure; onLiClick: (id: string) => void}) {
  const handleClick = () => {
    onLiClick(floor.id);
  };

  return <li className ={styles.liElements} onClick={handleClick}>{floor.name}</li>;
}
