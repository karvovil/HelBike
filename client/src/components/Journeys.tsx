import { FullJourney } from "../types"
import Journey from "./Journey"
interface JourneysProps {journeys: FullJourney[]}

const Journeys = ({journeys}: JourneysProps) => {
  return(
    <div>
      {journeys.map( j => <Journey 
        key={j.Departure} 
        journey={j}/> )}
    </div>
  );
}
export default Journeys
