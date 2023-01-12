import {BaseJourney} from "../types";
interface JourneyProps {journey: BaseJourney}

const Journey = ({journey}: JourneyProps) => {
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {journey.dep} to {journey.ret}
      </p>
      <p>
        {journey.dis} m in {journey.dur} seconds
      </p>
    </div>
  );
}
export default Journey