import {BaseJourney} from "../types";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface JourneyProps {journey: BaseJourney}

const Journey = ({journey}: JourneyProps) => {
  return (
    <TableRow key={journey.id}>
      <TableCell component="th" scope="row">
        {journey.departureStationName}
      </TableCell>
      <TableCell align="right">{journey.returnStationName}</TableCell>
      <TableCell align="right">{journey.distanceCovered}</TableCell>
      <TableCell align="right">{journey.duration}</TableCell>
    </TableRow>

  );
}
export default Journey