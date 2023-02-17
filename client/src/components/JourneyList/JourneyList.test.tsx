import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { testJourneys } from '../../util/testData';
import JourneyList from '.';

test('renders every journeys station names', () => {

  render(<JourneyList
    journeys={testJourneys}
    rowCount={200}
    rowsPerPage={50}
    currentPage={1}
    orderBy={'id'}
    orderDirection={'desc'}
    onPageChange={()=>({})}
    onHandleSortClick={()=>({})}
    onRowsPerPageChange={()=>({})}
  />);

  const departureStations =
   testJourneys.map(j => screen.getAllByText(
     `${j.departureStationName}`
   ));
  departureStations.map(e => expect(e).toBeDefined());

  const returnStations =
   testJourneys.map(j => screen.getAllByText(
     `${j.returnStationName}`
   ));
  returnStations.map(e => expect(e).toBeDefined());
});