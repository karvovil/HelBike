import {BaseJourney} from "./types";
import {Routes, Route, Link} from "react-router-dom"
import Journeys from "./components/Journeys";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";

const App = () => {

  const [journeys, setJourneys] = useState<BaseJourney[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/journeys')
      .then(response => {
        setJourneys(response.data)
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
        <Route path="/journeys" element={<Journeys journeys={journeys} />} />
        <Route path="/stations" element={<StationList />} />
        <Route path="/stations/:id" element={<SingleStation />} />
      </Routes>

    </div>
  );
}

export default App;
