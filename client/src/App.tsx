import {BaseJourney, BaseStation} from "./types";
import {Routes, Route, Link} from "react-router-dom"
import JourneyList from "./components/JourneyList";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";

const App = () => {

  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [stations, setStations] = useState<BaseStation[]>([])

  useEffect(() => {
    axios
      .get('/api/journeys')
      .then(response => {
        setJourneys(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

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
        <Route path="/journeys" element={<JourneyList journeys={journeys} />} />
        <Route path="/stations" element={<StationList stations={stations}/>} />
        <Route path="/stations/:id" element={<SingleStation stations={stations} />} />
      </Routes>

    </div>
  );
}

export default App;
