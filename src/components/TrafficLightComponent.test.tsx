import { render, screen } from '@testing-library/react';
import TrafficLightComponent from './TrafficLightComponent';

describe('Asserting that the TrafficLightComponent has the expected structure and behaviour', () => {

    test('Checking the number of the Lights', () => {
        render(<TrafficLightComponent color="Red" />);

        let lights = screen.getAllByRole('Light');
        expect(lights).toBeTruthy();
        expect(lights.length).toEqual(3);
    });

    test('Checking when the Red Light is ON, the others are OFF', () => {
        render(<TrafficLightComponent color="Red" />);

        let lights = screen.getAllByRole('Light');
        expect(lights).toBeTruthy();

        let redLight = lights.find(l => l.className === "Red");
        expect(redLight).toBeTruthy();
        
        let greenLight = lights.find(l => l.className === "Green Disabled");
        expect(greenLight).toBeTruthy();

        let yellowLight = lights.find(l => l.className === "Yellow Disabled");
        expect(yellowLight).toBeTruthy();

    });

    test('Checking when the Green Light is ON, the others are OFF', () => {
        render(<TrafficLightComponent color="Green" />);

        let lights = screen.getAllByRole('Light');
        expect(lights).toBeTruthy();

        let redLight = lights.find(l => l.className === "Red Disabled");
        expect(redLight).toBeTruthy();
        
        let greenLight = lights.find(l => l.className === "Green");
        expect(greenLight).toBeTruthy();

        let yellowLight = lights.find(l => l.className === "Yellow Disabled");
        expect(yellowLight).toBeTruthy();

    });

    test('Checking when the Yellow Light is ON, the others are OFF', () => {
        render(<TrafficLightComponent color="Yellow" />);

        let lights = screen.getAllByRole('Light');
        expect(lights).toBeTruthy();

        let redLight = lights.find(l => l.className === "Red Disabled");
        expect(redLight).toBeTruthy();
        
        let greenLight = lights.find(l => l.className === "Green Disabled");
        expect(greenLight).toBeTruthy();

        let yellowLight = lights.find(l => l.className === "Yellow");
        expect(yellowLight).toBeTruthy();

    });
});