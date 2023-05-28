export function Hotspot({
    id,
    name,
    onLiClick 

}) {
    const handleClick = () => {
        onLiClick(id);
      };

  return <li onClick={handleClick}>{name}</li>;

}
