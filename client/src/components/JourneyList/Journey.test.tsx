import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { testJourneys } from '../../testData';
import Journey from './Journey';
import TableBody from '@mui/material/TableBody';
import { Table } from '@mui/material';

test('renders journeys station names', () => {

  render(
    <Table>
      <TableBody>
        <Journey journey={testJourneys[0]} />
      </TableBody>
    </Table>
  );

  const departureStationName = screen.getByText(
    `${testJourneys[0].departureStationName}`
  );
  expect(departureStationName).toBeDefined();

  const returnStationName = screen.getByText(
    `${testJourneys[0].returnStationName}`
  );
  expect(returnStationName).toBeDefined();
});