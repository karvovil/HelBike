import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import SingleStation from './SingleStation'
import Router from 'react-router';
import {testStations} from '../testData'
import { MemoryRouter } from 'react-router-dom';


jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

test('renders given stations name', () => {

  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: testStations[0].id.toString()
  });

  render(<SingleStation stations={testStations} />);

  const element = screen.getByText(testStations[0].name);
  expect(element).toBeDefined();
});