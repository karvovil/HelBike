import {FullJourney} from "../types";
interface JourneyProps {journey: FullJourney}

const Journey = ({journey}: JourneyProps) => {
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {journey["Departure station name"]} to {journey["Return station name"]}
      </p>
      <p>
        {journey["Covered distance (m)"]} m in {journey["Duration (sec.)"]} seconds
      </p>
    </div>
  );
}
export default Journey