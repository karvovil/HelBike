import { BaseJourney } from "../types"
import Journey from "./Journey"
interface JourneysProps {journeys: BaseJourney[]}

const Journeys = ({journeys}: JourneysProps) => {
  return(
    <div>
      {journeys.map( j => <Journey 
        key={j.id} 
        journey={j}/> )}
    </div>
  );
}
export default Journeys
