import Link from '@mui/material/Link';
import { BaseJourney } from '../../types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface JourneyProps {journey: BaseJourney}

const Journey = ({ journey }: JourneyProps) => {
  return (
    <TableRow key={journey.id}>

      <TableCell component="th" scope="row">
        <Link
          underline="hover"
          color="inherit"
          href={`/stations/${journey.departureStationId}`}
        >
          {journey.departureStationName}
        </Link>
      </TableCell>

      <TableCell >
        <Link
          underline="hover"
          color="inherit"
          href={`/stations/${journey.returnStationId}`}
        >
          {journey.returnStationName}
        </Link>
      </TableCell>

      <TableCell align="right" >{journey.distanceCovered}</TableCell>

      <TableCell align="right" >{journey.duration}</TableCell>

    </TableRow>

  );
}
export default Journey