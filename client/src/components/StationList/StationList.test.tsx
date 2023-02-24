import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import StationList from '../StationList'
import { BrowserRouter } from 'react-router-dom';
import { testStations } from '../../../../testData';

test('renders first stations name', () => {

  render(<StationList stations={testStations} />, {wrapper: BrowserRouter});

  const element = screen.getByText(testStations[0].name);
  expect(element).toBeDefined();
});