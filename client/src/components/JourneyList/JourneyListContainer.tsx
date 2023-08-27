import Journey from './Journey'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import JourneyHeaders from './JourneyListHeaders';
import { TableFooter, TableRow, TablePagination } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { BaseJourney, Order } from '../../types';

interface JourneyListContainerProps {
	journeys: BaseJourney[],
  currentPage: number,
  orderBy: string,
  orderDirection: Order
  rowCount: number,
	rowsPerPage: number,
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
  handleSortClick: (orderAttribute: string) => void,
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}
const JourneyListContainer = ({
  journeys, currentPage, orderBy, orderDirection, rowCount,
  rowsPerPage, handlePageChange, handleSortClick, handleChangeRowsPerPage,
}: JourneyListContainerProps) => {

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>

      <TableContainer >
        <Table
          sx={{ minWidth: 500 }}
          size="small"
        >
          <JourneyHeaders
            orderBy={orderBy}
            orderDirection={orderDirection}
            onHandleSortClick={handleSortClick}
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
                onPageChange={handlePageChange}
                ActionsComponent={TablePaginationActions}
                rowsPerPageOptions={[50, 100, 200]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default JourneyListContainer