export function Hotspot({
    id,
    name,
    onLiClick 

} : { id: string, name: string, onLiClick: (id: string) => void  }) {
    const handleClick = () => {
        onLiClick(id);
      };

  return <li onClick={handleClick}>{name}</li>;

}
