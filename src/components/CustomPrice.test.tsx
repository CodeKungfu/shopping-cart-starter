import { render, screen } from '@testing-library/react';
import CustomPrice from './CustomPrice';

test('renders custom price component', () => {
  render(<CustomPrice price={8.8}  />);
  const linkElement = screen.getByText(/.80/i);
  expect(linkElement).toBeInTheDocument();
});
