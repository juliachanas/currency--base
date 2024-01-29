import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      {
        from: 'PLN',
        to: 'USD',
        amount: 100,
        expectedOutput: 'PLN 100.00 = $28.57',
      },
      {
        from: 'PLN',
        to: 'USD',
        amount: 500,
        expectedOutput: 'PLN 500.00 = $142.86',
      },
      {
        from: 'PLN',
        to: 'USD',
        amount: 200,
        expectedOutput: 'PLN 200.00 = $57.14',
      },
      {
        from: 'PLN',
        to: 'USD',
        amount: 1000,
        expectedOutput: 'PLN 1,000.00 = $285.71',
      },
    ];

    for (const testObj of testCases) {
      const { from, to, amount, expectedOutput } = testObj;

      // render component and store the result
      render(<ResultBox from={from} to={to} amount={amount} />);

      // find the output element
      const output = screen.getByTestId('output');
      // assert the text content
      expect(output).toHaveTextContent(expectedOutput);

      // unmount component
      cleanup();
    }
  });
});
