import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render, wait, fireEvent,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { InMemoryCache } from 'apollo-boost';
import CartComponent from '../components/Cart';
import theme from '../components/styles/theme';
import { ApolloMockedProvider } from '../test-utils/providers';

const queryResolvers = {
  me: () => ({
    cart: [{
      id: 'xyz',
      quantity: 1,
      item: {
        id: 'abc',
        title: 'Candy bar',
        description: 'Chocolate',
        image: 'candybar.jpg',
        largeImage: 'candybarLarge.jpg',
        price: 150,
        ratings: [{ id: 'rat1', rating: 5 }, { id: 'rat2', rating: 2 }],
      },
    }],
    email: 'test@test.com',
    id: 'abc123',
    name: 'Michael Scott',
    permissions: ['USER'],
  }),
};

const mutationResolvers = {
  updateCartItem: jest.fn(() => ({
    id: 'xyz',
    quantity: 10,
    item: {
      id: 'abc',
      title: 'Candy bar',
      description: 'Chocolate',
      image: 'candybar.jpg',
      largeImage: 'candybarLarge.jpg',
      price: 150,
      ratings: [{ id: 'rat1', rating: 5 }, { id: 'rat2', rating: 2 }],
    },
  })),
};

const cache = new InMemoryCache().restore({
  ROOT_QUERY: {
    cartOpen: true,
  },
});

test('cart renders details', async () => {
  const {
    queryByText,
    queryAllByText,
    queryByAltText,
    queryByDisplayValue,
  } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
      cache={cache}
    >
      <ThemeProvider theme={theme}>
        <CartComponent />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const count = queryByText('You have 1 item in your cart.');
  expect(count).toBeTruthy();

  const img = queryByAltText(/candy bar/i);
  expect(img).toHaveAttribute('src', 'candybar.jpg');

  const title = queryByText(/candy bar/i);
  expect(title).toBeTruthy();

  const select = queryByDisplayValue('1');
  expect(select).toBeTruthy();

  const price = queryAllByText('$1.50');
  expect(price).toBeTruthy();
});

test('updates cart item quantity', async () => {
  const { queryByDisplayValue } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
        Mutation: () => mutationResolvers,
      }}
      cache={cache}
    >
      <ThemeProvider theme={theme}>
        <CartComponent />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const select = queryByDisplayValue('1');
  fireEvent.change(select, { target: { value: '10' } });

  await wait(() => expect(mutationResolvers.updateCartItem).toHaveBeenCalled());
});
