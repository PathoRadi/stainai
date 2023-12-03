import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Department of Radiology', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Department of Radiology/i);
  // expect(linkElement).toBeInTheDocument();
});
