import {BaseJourney, BaseStation} from "./types";
import {Routes, Route, Link, useMatch} from "react-router-dom"
import Journeys from "./components/Journeys";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";

const App = () => {

  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [stations, setStations] = useState<BaseStation[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/journeys')
      .then(response => {
        setJourneys(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/stations')
      .then(response => {
        setStations(response.data)
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
        <Route path="/stations" element={<StationList stations={stations.map(s=>s.name)}/>} />
        <Route path="/stations/:id" element={<SingleStation station={station} />} />
      </Routes>

    </div>
  );
}

export default App;
