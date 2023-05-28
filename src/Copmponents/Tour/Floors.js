import styles from './styles.module.css';

export function Floors({ 
  floor, 
  onLiClick 
}) {
  const handleClick = () => {
    onLiClick(floor.id);
  };

  return <li className ={styles.liElements} onClick={handleClick}>{floor.name}</li>;
}
