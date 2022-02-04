import React from 'react';
import { render, screen } from '@testing-library/react';

import Page from '../page';

describe('<Page /> component', () => {
  const child = (<div data-testid="test-div"></div>);
  const { getByText } = render(<Page>{child}</Page>);
  
  it('should render children', () => {
    expect(screen.getByTestId('test-div')).toBeInTheDocument();
  });
});