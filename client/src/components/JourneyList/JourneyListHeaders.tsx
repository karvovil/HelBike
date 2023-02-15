import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from "@mui/material/TableSortLabel";
import { Order } from '../../types';

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
interface JourneyHeadersProps {
    orderBy: string,
    orderDirection: Order
    onHandleSortClick: (orderString: string) => void
  }
const JourneyHeaders = (
  {orderBy, orderDirection, onHandleSortClick}: JourneyHeadersProps ) => {
  
  return(
    <TableHead>
      <TableRow>
  
        {headCells.map((hc) => (
          <TableCell
            key={hc.id}
            align={hc.id === 'departureStationName'
				|| hc.id === 'returnStationName' 
              ? 'inherit' : 'right'}
          >
            <TableSortLabel
              active={orderBy === hc.id}
              onClick={() => onHandleSortClick(hc.id)}
              direction={orderBy === hc.id ? orderDirection : 'asc'}
            >
              <b>{hc.label}</b>
            </TableSortLabel>

          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  )
}
export default JourneyHeaders