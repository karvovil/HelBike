import {BaseStation} from "../types";
interface StationProps {station: BaseStation | null | undefined}

const SingleStation = ({station}: StationProps) => {
  if (!station) {return null}
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {station.name} 
      </p>
      <p>
        {station.address}
      </p>
    </div>
  );
}
export default SingleStation