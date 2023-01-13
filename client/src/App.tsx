import {BaseJourney, BaseStation} from "./types";
import {Routes, Route, Link, useMatch} from "react-router-dom"
import Journeys from "./components/Journeys";
import Stations from "./components/StationList";
import SingleStation from "./components/SingleStation";

const journeys: Array<BaseJourney> = [
  { id: 1, dep: "Laajalahden aukio", ret: "Teljäntie",        dis: 2043, dur: 500 },
  { id: 2, dep: "Töölöntulli",       ret: "Pasilan asema",    dis: 1870, dur: 611 },
  { id: 3, dep: "Näkinsilta",        ret: "Vilhonvuorenkatu", dis: 1025, dur: 399 }
];
const stations: Array<BaseStation> = [
  {name: "Hanasaari",      address: "Hanasaarenranta 1"},
  {name: "Keilalahti",     address: "Keilalahdentie 2" },
  {name: "Westendinasema", address: "Westendintie 1"   }
];
const stationNames = stations.map(s=>s.name) 

const App = () => {
  const match = useMatch('/stations/:id')
  const station = match ? stations.find(s => s.name === (match.params.id)) : null
  return (
    <div>
      <div>
        <Link to="/journeys">journeys</Link>
        <Link to="/stations">stations</Link>
      </div>

      <div>
        <h1> Helsinki City Bike App</h1>
      </div>

      <Routes>  
        <Route path="/journeys" element={<Journeys journeys={journeys} />} />
        <Route path="/stations" element={<Stations stations={stationNames} />} />
        <Route path="/stations/:id" element={<SingleStation station={station} />} />
      </Routes>

    </div>
  );
}

export default App;
