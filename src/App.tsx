import BaseJourney from "./types";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Journeys from "./components/Journeys";
import Stations from "./components/StationList";

const journeys: Array< BaseJourney > = [
  { id: 1, dep: "Laajalahden aukio", ret: "Teljäntie",        dis: 2043, dur: 500 },
  { id: 2, dep: "Töölöntulli",       ret: "Pasilan asema",    dis: 1870, dur: 611 },
  { id: 3, dep: "Näkinsilta",        ret: "Vilhonvuorenkatu", dis: 1025, dur: 399 }
];
const stations: Array<string> = ["Hanasaari","Keilalahti","Westendinasema"]

const App = () => {
  return (
    <Router>

      <div>
        <Link to="/journeys">journeys</Link>
        <Link to="/stations">stations</Link>
      </div>

      <div>
        <h1> Helsinki City Bike App</h1>
      </div>
      
      <Routes>
        <Route path="/journeys" element={<Journeys journeys={journeys} />} />
        <Route path="/stations" element={<Stations stations={stations} />} />
      </Routes>

    </Router>
  );
}

export default App;
