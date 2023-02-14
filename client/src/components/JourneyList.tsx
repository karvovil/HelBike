import { BaseJourney } from "../types"
import Journey from "./Journey"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
interface JourneyListProps {
  journeys: BaseJourney[],
  currentPage: number,
  pageLimit: number,
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>,
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
  onHandleSortClick: (orderString: string) => void
}

const JourneyList = (
  {journeys, currentPage, pageLimit,//TODO don't allow increasing page number beyond this
    onPreviousPageClick, onNextPageClick, onHandleSortClick}
  : JourneyListProps) => {
    
  return(
    <><div>

      <button
        onClick={onPreviousPageClick}
        disabled={currentPage < 2}
      >
        Prev. Page
      </button>

      {currentPage}

      <button onClick={onNextPageClick}>
        Next Page
      </button>




    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

        <TableHead>
          <TableRow>
            <TableCell onClick={() => onHandleSortClick('departureStationName')}>Departure station name</TableCell>

            <TableCell
              align="right"
              onClick={() => onHandleSortClick('returnStationName')}
            >
              Return station name
            </TableCell>

            <TableCell align="right" onClick={() => onHandleSortClick('distanceCovered')}>Distance covered</TableCell>
            <TableCell align="right" onClick={() => onHandleSortClick('duration')}>Duration</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {journeys.map(j => <Journey
            key={j.id}
            journey={j} />)}
        </TableBody>

      </Table>
    </TableContainer></>
    
  );
}
export default JourneyList
