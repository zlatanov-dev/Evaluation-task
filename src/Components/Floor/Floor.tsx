import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Hotspot } from "./Hotspot";
import styles from "./styles.module.css";
import { Loader } from "../Loader/Loader"
import { Structure, Position } from "../../Types/types";
import ImageHotspots from "react-image-hotspots";
import { endpoint } from "../../parameters/tourParams";

export function Floor({ structure  }: { structure: Structure[]}) {
  const { floorId } = useParams();
  const navigate = useNavigate();
  const [hotspotCoordinates, setHotspotCoordinates] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const floor = structure ? structure.find((x) => x.id === floorId) : undefined;
  const hotspots = floor ? floor.hotspots : [];
  
  const handleLiClick = (hotspotId: string) => {
    navigate(endpoint(hotspotId).hotspot);
  };

  useEffect(() => {
    const handleHotspotClick = (hotspotId: string) => {
      navigate(endpoint(hotspotId).hotspot);
    };

    if (floor) {
      const coordinates = hotspots.map((hotspot ) => ({
        x: hotspot.position.x,
        y: hotspot.position.y,
        content: (
          <div
            className={styles.redDot}
            onClick={() => handleHotspotClick(hotspot.id)}
          ></div>
        ),
      }));

      setHotspotCoordinates(coordinates);
      setLoading(false);
    }
  }, [floor, hotspots, Navigate ]);

  return (
  <>
    { loading 
      ? <Loader />
      :     <>
      <h1>Floor: {floor ? floor.name : "Loading..."}</h1>
      <div style={{ display: "flex" }}>
        {floor && (
          <section style={{ width: "30%", height: "50vh" }}>
            <ul>
              {hotspots.map((hotspot) => (
                <Hotspot
                  key={hotspot.id}
                  {...hotspot}
                  onLiClick={handleLiClick}
                />
              ))}
            </ul>
          </section>
        )}
        <section
          style={{
            width: "60%",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageHotspots
            src={floor ? floor.floor_plan : ""}
            alt="Floor image"
            hotspots={hotspotCoordinates}
            
          />
        </section>
      </div>
    </>
    }
    </>

  );
}