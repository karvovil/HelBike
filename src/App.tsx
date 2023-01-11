import Journey from "./components/Journey";
import BaseJourney from "./types";

const journeys: Array< BaseJourney > = [
  { id: 1, dep: "Laajalahden aukio", ret: "Teljäntie",        dis: 2043, dur: 500 },
  { id: 2, dep: "Töölöntulli",       ret: "Pasilan asema",    dis: 1870, dur: 611 },
  { id: 3, dep: "Näkinsilta",        ret: "Vilhonvuorenkatu", dis: 1025, dur: 399 }
];

const App = () => {
  return (
    <div>
      <h1> Helsinki City Bike App</h1>
      {journeys.map( j => <Journey key={j.id} journey={j}/> )}
    </div>
  );
}

export default App;
