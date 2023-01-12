import BaseJourney from "./types";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Journeys from "./components/Journeys";


const journeys: Array< BaseJourney > = [
  { id: 1, dep: "Laajalahden aukio", ret: "Teljäntie",        dis: 2043, dur: 500 },
  { id: 2, dep: "Töölöntulli",       ret: "Pasilan asema",    dis: 1870, dur: 611 },
  { id: 3, dep: "Näkinsilta",        ret: "Vilhonvuorenkatu", dis: 1025, dur: 399 }
];

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/journeys">journeys</Link>
      </div>

      <div>
        <h1> Helsinki City Bike App</h1>
      </div>
      
      <Routes>
        <Route path="/journeys" element={<Journeys journeys={journeys} />} />
      </Routes>


    </Router>
  );
}

export default App;
