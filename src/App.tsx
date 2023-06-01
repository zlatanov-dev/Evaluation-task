import { Routes, Route } from "react-router-dom";
import { Tour } from "./Components/Tour/Tour";
import { Start } from "./Components/Start/Start";
import { useEffect, useState } from "react";
import { getTourConfigurations } from "./service/TourService";
import { Floor } from "./Components/Floor/Floor";
import { Hotspot } from "./Components/Hotspot/Hotspot";
import { Structure, TourConfigurations } from "./Types/types";

function App() {
  const [structure, setTourStructure] = useState<Structure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourConfigurations().then((tour: TourConfigurations) => setTourStructure(tour.structure));
    setLoading(false);
  }, []);


  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start loading={loading}/>} />
          <Route
            path="/v1/tours/viewer/:tourId"
            element={<Tour structure={structure} />}
          />
          <Route
            path="/:tourId/:floorId"
            element={
              <Floor structure={structure} />
            }
          />
          <Route
            path="/v1/tours/viewer/:tourId/hotspots/:hotspotId"
            element={<Hotspot />}
          />
          <Route path='*' element={<h1>404</h1>}/>
        </Routes>
      </div>
    </>
    
  );
}

export default App;
