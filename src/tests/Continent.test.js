import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import store from '../redux/configureStore';
import '@testing-library/jest-dom';
import {
  filterCountries, filterCountry, getData, selectContinent,
} from '../redux/covidApi/covidSlice';
import Header from '../components/Header';
import Home from '../components/Home';
import Continent from '../components/Continent';

jest.mock('./mockApi.js');

describe('Home page tests', () => {
  test('HomePage matches snapshot', async () => {
    await store.dispatch(getData());
    const homePage = act(async () => renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Home />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON());
    expect(homePage).toMatchSnapshot();
  });

  describe('Link Interaction', () => {
    test('Check how many continent links are in the page => should be 6', () => {
      act(() => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Home />
            </BrowserRouter>
          </Provider>,
        );
      });
      screen.queryAllByRole('link').forEach((role) => expect(role).toBeInTheDocument());
      expect(screen.queryAllByRole('link').length).toBe(6);
    });
    test('Fire continent view more', () => {
      act(() => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Home />
            </BrowserRouter>
          </Provider>,
        );
      });
      fireEvent.select(screen.getByText('South America'));
      expect(screen.getByText('South America')).toBeInTheDocument();
    });
    test('Test if new page is rendered', async () => {
      await store.dispatch(selectContinent('South America'));
      await store.dispatch(filterCountries('South America'));
      const homePage = act(async () => renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Continent />
            </BrowserRouter>
          </Provider>,
        )
        .toJSON());
      expect(homePage).toMatchSnapshot();
    });
  });
  describe('Test Filter', () => {
    test('Test match by Brazil => since there is only one brazil country this should have a length of 1', async () => {
      await store.dispatch(filterCountry('brazil'));
      act(async () => {
        await render(
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Continent />
            </BrowserRouter>
          </Provider>,
        );
      });
      expect(screen.queryAllByRole('link').length).toBe(1);
    });
  });
});
