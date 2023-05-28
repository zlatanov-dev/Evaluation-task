import { useNavigate } from "react-router-dom";
import { Floors } from "./Floors";
import { useParams } from 'react-router-dom';
import { Loader } from "../Loader/Loader";

export function Tour({ structure, setFloorId, loading }) {
  const navigate = useNavigate();
  const { tourId } = useParams();

  const handleLiClick = (key) => {
    setFloorId(key);
    navigate(`/${tourId}/${key}`);
  };
  if(structure == undefined) {
    structure = [];
  }
  return (
    <>
    { loading 
      ? <Loader />
      : 
        <div>
          <h1>Floors in the Tour</h1>
          <ul>
            {structure.map((floor) => (
              <Floors key={floor.id} floor={floor} onLiClick={handleLiClick} />
            ))}
          </ul>
        </div>
  }
  </>
  )
}
