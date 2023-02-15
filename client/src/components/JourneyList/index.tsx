import { BaseJourney, Order } from "../../types"
import Journey from "./Journey"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import JourneyHeaders from "./JourneyListHeaders";
import Pagination from "./Pagination";

interface JourneyListProps {
  journeys: BaseJourney[]
  currentPage: number
  pageLimit: number
  orderBy: string
  orderDirection: Order
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
  onHandleSortClick: (orderString: string) => void
}

const JourneyList = (
  {journeys, currentPage, pageLimit, orderBy, orderDirection,
    //TODO don't allow increasing page number beyond this
    onPreviousPageClick, onNextPageClick, onHandleSortClick}
  : JourneyListProps) => {
    
  return(
    <Paper sx={{ width: '100%', mb: 2 }}>

      <Pagination 
        currentPage={currentPage}
        pageLimit={pageLimit}
        onPreviousPageClick={onPreviousPageClick}
        onNextPageClick={onNextPageClick}
      />
      <TableContainer >
        <Table 
          sx={{ minWidth: 500 }}
          size="small"
        >
          <JourneyHeaders
            orderBy={orderBy}
            orderDirection={orderDirection}
            onHandleSortClick={onHandleSortClick}
          />

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
