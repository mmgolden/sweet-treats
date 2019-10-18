import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import RatingComponent from '../components/Rating';
import theme from '../components/styles/theme';
import { ApolloMockedProvider } from '../test-utils/providers';

const id = '123';
const ratings = [{ id: '123', rating: 5 }, { id: '456', rating: 2 }];

describe('<Rating />', () => {
  it('renders the select', () => {
    const { debug, queryByDisplayValue } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <RatingComponent itemId={id} ratings={ratings} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
    debug();
    const select = queryByDisplayValue('5');
    expect(select).toBeTruthy();
  });
});
