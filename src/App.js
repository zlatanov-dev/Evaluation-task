import { Routes, Route, useLocation } from "react-router-dom";
import { Tour } from "./Copmponents/Tour/Tour";
import { Start } from "./Copmponents/Start/Start";
import { useEffect, useState } from "react";
import { tourParams } from "./parameters/tourParams";
import { getTourConfigurations } from "./service/TourService";
import { Floor } from "./Copmponents/Floor/Floor";
import { Hotspot } from "./Copmponents/Hotspot/Hotspot";
import { Loader } from "./Copmponents/Loader/Loader";

function App() {
  const [params, setParams] = useState(tourParams);
  const [tourConfigurations, setTourConfig] = useState([]);
  const [floorId, setFloorId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourConfigurations().then((tour) => setTourConfig(tour));
    setLoading(false);
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Start {...params} loading={loading}/>} />
          <Route
            path="/v1/tours/viewer/:tourId"
            element={<Tour {...tourConfigurations} setFloorId={setFloorId} loading={loading} />}
          />
          <Route
            path="/:tourId/:floorId"
            element={
              <Floor {...tourConfigurations} floorId={floorId} {...params} />
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
