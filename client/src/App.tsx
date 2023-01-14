import {BaseStation} from "./types";
import {Routes, Route, Link, useMatch} from "react-router-dom"
import Journeys from "./components/Journeys";
import Stations from "./components/StationList";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";

const stations: Array<BaseStation> = [
  {name: "Hanasaari",      address: "Hanasaarenranta 1"},
  {name: "Keilalahti",     address: "Keilalahdentie 2" },
  {name: "Westendinasema", address: "Westendintie 1"   }
];
const stationNames = stations.map(s=>s.name) 

const App = () => {

  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/journeys')
      .then(response => {
        setJourneys(response.data)
      })
  }, [])

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
