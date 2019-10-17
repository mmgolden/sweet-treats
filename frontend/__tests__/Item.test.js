import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { render, queryByAltText } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ItemComponent from '../components/Item';
import theme from '../components/styles/theme';
import { ApolloMockedProvider } from '../test-utils/providers';
import formatMoney from '../lib/formatMoney';

const fakeItem = {
  id: '12345',
  title: 'Lollipop',
  price: 300,
  description: 'Candy on a stick',
  image: 'lollipop.jpg',
  largeImage: 'largeLollipop.jpg',
  ratings: [5],
};

describe('<Item />', () => {
  it('renders the image', () => {
    const { debug, queryByAltText } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
    debug();
    const img = queryByAltText(fakeItem.title);
    expect(img).toHaveAttribute('alt', fakeItem.title);
    expect(img).toHaveAttribute('src', fakeItem.image);
  });

  it('renders the title and price', () => {
    const { queryByText } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
    const title = queryByText(fakeItem.title);
    expect(title).toHaveTextContent(fakeItem.title);
    const price = queryByText(formatMoney(fakeItem.price));
    expect(price).toHaveTextContent(formatMoney(fakeItem.price));
  });

  it('renders the rating', () => {
    const { queryByText } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
  });
});