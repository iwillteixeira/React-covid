import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { Provider, } from 'react-redux';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/configureStore';
import '@testing-library/jest-dom';
import { getData } from '../redux/covidApi/covidSlice';
import Header from '../components/Header';
import Home from '../components/Home.js';

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
  });
});
