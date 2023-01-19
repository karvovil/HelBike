import {BaseJourney} from "../types";
interface JourneyProps {journey: BaseJourney}

const Journey = ({journey}: JourneyProps) => {
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {journey.departureStationName} to {journey.returnStationName}
      </p>
      <p>
        {journey.distanceCovered} m in {journey.duration} seconds
      </p>
    </div>
  );
}
export default Journey