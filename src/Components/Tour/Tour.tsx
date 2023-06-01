import { useNavigate } from "react-router-dom";
import { Floors } from "./Floors";
import { Loader } from "../Loader/Loader";
import { Structure } from "../../Types/types";
import { endpoint } from "../../parameters/tourParams";

export function Tour({ structure }: { structure?: Structure[]}) {
    const navigate = useNavigate();
  
    const handleLiClick = (floorId: string) => {
      navigate(endpoint(floorId).floorView);
    };
  
    if (structure === undefined) {
      return <Loader />;
    }
    
    if (structure.length === 0) {
      return <p>No floors available in the tour.</p>;
    }
  
    return (
        <>
        { 
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
  
