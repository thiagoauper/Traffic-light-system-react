import { render, screen } from '@testing-library/react';
import App from './App';

describe('Asserting that the App root component has the expected structure and behaviour', () => {

  test('Checking that the label for indicating whether it is Peak Hour exists', () => {
    render(<App />);
    const peakHourLabel = screen.getByText(/Is peak hour?/i);
    expect(peakHourLabel).toBeInTheDocument();
  });

  test('Checking that the Traffic Lights where properly rendered', () => {
    render(<App />);
    let trafficLights = screen.getAllByRole('TrafficLight');
    expect(trafficLights).toBeTruthy();
    expect(trafficLights.length).toEqual(4);
  });

  test('Checking that the four Cardinal directions were properly rendered', () => {
    render(<App />);

    expect(screen.getByText('NW')).toBeTruthy();
    expect(screen.getByText('NE')).toBeTruthy();
    expect(screen.getByText('SW')).toBeTruthy();
    expect(screen.getByText('SE')).toBeTruthy();
  });

});