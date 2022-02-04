import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

describe('<App />', () => {
  it('renders app starting with login page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    expect(getByText(/To play, please log into your account:/i)).toBeInTheDocument();
    expect(getByText(/Username/i)).toBeInTheDocument();
    expect(getByText(/Password/i)).toBeInTheDocument();
  });
});
