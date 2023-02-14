import { BaseJourney, Order } from "../types"
import Journey from "./Journey"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from '@mui/utils';
interface JourneyListProps {
  journeys: BaseJourney[],
  currentPage: number,
  pageLimit: number,
  orderBy: string,
  order: Order
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>,
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
  onHandleSortClick: (orderString: string) => void
}
interface HeadCell {
  id: string,
  label: string,
}

const headCells: readonly HeadCell[] = [
  {id: 'departureStationName', label: 'Departure station name'},
  {id: 'returnStationName'   , label: 'Return Station name'},
  {id: 'distanceCovered'     , label: 'Distance covered'},
  {id: 'duration'            , label: 'Duration'},
]

const JourneyList = (
  {journeys, currentPage, pageLimit, orderBy, order,
    //TODO don't allow increasing page number beyond this
    onPreviousPageClick, onNextPageClick, onHandleSortClick}
  : JourneyListProps) => {
    
  return(
    <Paper sx={{ width: '100%', mb: 2 }}>
      <button
        onClick={onPreviousPageClick}
        disabled={currentPage < 2}>
        Prev. Page
      </button>

      {currentPage}

      <button onClick={onNextPageClick}>
        Next Page
      </button>

      <TableContainer >
        <Table 
          sx={{ minWidth: 500 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              
              {headCells.map((hc) => (
                <TableCell
                  key={hc.id}
                  align={hc.id === 'departureStationName' ? 'inherit' : 'right'}
                >
                  <TableSortLabel
                    active={orderBy === hc.id}
                    onClick={() => onHandleSortClick(hc.id)}
                    direction={orderBy === hc.id ? order : 'asc'}
                  >
                    {hc.label}
                  </TableSortLabel>

                </TableCell>
              ))}

            </TableRow>
          </TableHead>

          <TableBody>
            {journeys.map(j => <Journey
              key={j.id}
              journey={j} />)}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
export default JourneyList
