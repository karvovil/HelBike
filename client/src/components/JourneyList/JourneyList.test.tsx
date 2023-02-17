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

  const elements =
   testJourneys.map(j => screen.getByText(
     `${j.departureStationName} to ${j.returnStationName}`
   ));
  elements.map(e => expect(e).toBeDefined());
});