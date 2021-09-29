import { render, screen } from '@testing-library/react';
import LightComponent from './LightComponent';

describe('Asserting that the LightComponent has the expected structure and behaviour', () => {

    test('Checking that the Light was properly rendered', () => {
        render(<LightComponent color="Green" enabled={true} />);
        
        let lights = screen.getAllByRole('Light');
        expect(lights).toBeTruthy();
        expect(lights.length).toEqual(1);
    });

    test('Checking that the Light is Shiny when it is ON', () => {
        render(<LightComponent color="Green" enabled={true} />);
        
        let lights = screen.getAllByRole('Light');

        expect(lights.find(l => l.className.includes('Green'))).toBeTruthy();
        expect(lights.find(l => l.className.includes('Disabled'))).toBeFalsy();
    });

    test('Checking that the Light is Opaque when it is OFF', () => {
        render(<LightComponent color="Green" enabled={false} />);
        
        let lights = screen.getAllByRole('Light');

        expect(lights.find(l => l.className.includes('Green'))).toBeTruthy();
        expect(lights.find(l => l.className.includes('Disabled'))).toBeTruthy();
    });
});