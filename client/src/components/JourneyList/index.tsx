import { BaseJourney, Order } from "../../types"
import Journey from "./Journey"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import JourneyHeaders from "./JourneyListHeaders";
import { TableFooter, TableRow, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface JourneyListProps {
  journeys: BaseJourney[]
  currentPage: number
  rowCount: number
  orderBy: string
  orderDirection: Order
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement>
    ) => void
  onHandleSortClick: (orderString: string) => void
}

const JourneyList = (
  {journeys, rowCount, orderBy, orderDirection, currentPage, rowsPerPage,
    onPageChange, onRowsPerPageChange, onHandleSortClick}
  : JourneyListProps) => {
    
  return(
    <Paper sx={{ width: '100%', mb: 2 }}>

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
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rowCount}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                ActionsComponent={TablePaginationActions}
                rowsPerPageOptions={[50, 100, 200]}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default JourneyList
