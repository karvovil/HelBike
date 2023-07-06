import { BaseJourney, Order } from "../../types"
import Journey from "./Journey"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import JourneyHeaders from "./JourneyListHeaders";
import { TableFooter, TableRow, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JourneyList = () => {
  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [orderBy, setOrderBy] = useState('distanceCovered')
  const [orderDirection, setOrder] = useState<Order>('asc')
  const [rowCount, setrowCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const { departingStationName, returningStationName } = useParams();
  useEffect(() => {
    axios
      .get(`/api/journeys?currentPage=${currentPage}&orderBy=${orderBy}`
        + `&orderDirection=${orderDirection}&rowsPerPage=${rowsPerPage}`
        + (departingStationName ? `&departingStation=${departingStationName}` : '')
        + (returningStationName ? `&returningStation=${returningStationName}` : ''))
      .then(response => {
        setrowCount(response.data.count)
        setJourneys(response.data.rows)
      })
  }, [currentPage, orderBy, orderDirection, rowsPerPage])
  
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => setCurrentPage(newPage)

  const handleSortClick = (orderAttribute: string) =>  {
    if (orderBy === orderAttribute){
      orderDirection === 'asc' ? setOrder('desc') : setOrder('asc')
    } else {
      setOrderBy(orderAttribute)
      setOrder('asc')
    }
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

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
export default JourneyList