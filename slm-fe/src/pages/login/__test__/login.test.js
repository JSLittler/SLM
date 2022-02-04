import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';

import { store } from '../../../redux/store';
import Login from '../index';
import rootReducer from '../../../redux/reducers/rootReducer';
import { PAGES } from '../../../constants';

const user = {
    id: 'someId',
    username: 'mock user',
    loggedIn: true,
};

const mockHistory = [];

export function createTestStore() {
  const store = createStore(
    combineReducers({
      user: rootReducer,
    })
  );
  return store;
}

const mockAPIClient = () => jest.fn().mockImplementation(() => user);

jest.mock('../../../utils/apiClient', () => ({
  __esModule: true,
  default: () => mockAPIClient()()
}));

const mockState = {
  user: {
    loggedIn: false,
  },
  game: {},
  messages: {
    loginMessage: 'Incorrect Username or Password',
  },
};

const mockStore = configureMockStore()(mockState);

describe('<Login />', () => {
  const getMockLogin = (setupStore = store) => {
    return (
      render(
        <Provider store={setupStore}>
          <Login history={mockHistory} />
        </Provider>
      )
    );
  };
  
  it('renders login page', () => {
    const { getByText } = getMockLogin();
    
    expect(getByText(/To play, please log into your account:/i)).toBeInTheDocument();
    expect(getByText(/Username:/i)).toBeInTheDocument();
    expect(getByText(/Password:/i)).toBeInTheDocument();
  });

  it('displays failed log in message if details are incorrect', () => {
    const { getByText } = getMockLogin(mockStore);

    expect(getByText(/Incorrect Username or Password/i)).toBeInTheDocument();
  });

  it('should call the api client, update store and move to next page when login details are correct', async () => {
    const testStore = createTestStore();
    getMockLogin(testStore);

    const loginForm = screen.getByRole('form');
    const eventvalue = [{ value: 'mock user' }, { value: 'password' }];
    await fireEvent.submit(loginForm, { target: eventvalue });
    
    expect(testStore.getState().user.user).toBe(user);
    expect(mockHistory[0]).toBe(PAGES.SAVED_GAMES_PAGE.path);
  });
});