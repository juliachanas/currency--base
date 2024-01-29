import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion PLN -> USD', () => {
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
  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      {
        from: 'USD',
        to: 'PLN',
        amount: 20,
        expectedOutput: '$20.00 = PLN 70.00',
      },
      {
        from: 'USD',
        to: 'PLN',
        amount: 345,
        expectedOutput: '$345.00 = PLN 1,207.50',
      },
      {
        from: 'USD',
        to: 'PLN',
        amount: 1200,
        expectedOutput: '$1,200.00 = PLN 4,200.00',
      },
      {
        from: 'USD',
        to: 'PLN',
        amount: 1,
        expectedOutput: '$1.00 = PLN 3.50',
      },
    ];

    for (const testObj of testCases) {
      const { from, to, amount, expectedOutput } = testObj;

      // render component
      render(<ResultBox from={from} to={to} amount={amount} />);

      // find the output element
      const output = screen.getByTestId('output');

      // check the text content
      expect(output).toHaveTextContent(expectedOutput);

      // unmount component
      cleanup();
    }
  });

  it('should render proper info about when from = to', () => {
    const testCases = [
      {
        from: 'USD',
        to: 'USD',
        amount: 20,
        expectedOutput: '$20.00 = $20.00',
      },
      {
        from: 'PLN',
        to: 'PLN',
        amount: 345,
        expectedOutput: 'PLN 345.00 = PLN 345.00',
      },
    ];

    for (const testObj of testCases) {
      const { from, to, amount, expectedOutput } = testObj;

      // render component and store the result
      render(<ResultBox from={from} to={to} amount={amount} />);

      // find the output element
      const output = screen.getByTestId('output');

      // check the text content
      expect(output).toHaveTextContent(expectedOutput);

      // unmount component
      cleanup();
    }
  });

  it('should render proper info when incorrect value', () => {
    const testCases = [
      {
        from: 'USD',
        to: 'PLN',
        amount: -20,
        expectedOutput: 'Wrong value...',
      },
      {
        from: 'PLN',
        to: 'USD',
        amount: -345,
        expectedOutput: 'Wrong value...',
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
