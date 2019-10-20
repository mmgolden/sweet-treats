import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render, wait, fireEvent,
} from '@testing-library/react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import ItemsComponent from '../components/Items';
import theme from '../components/styles/theme';
import {
  ApolloMockedProvider,
  ApolloLoadingProvider,
  ApolloErrorProvider,
} from '../test-utils/providers';

const page = 1;

const queryResolvers = {
  items: () => ([
    {
      id: 'abc',
      title: 'Candy bar',
      description: 'Chocolate',
      image: 'candybar.jpg',
      largeImage: 'candybarLarge.jpg',
      price: 150,
      ratings: [{ id: 'rat1', rating: 5 }, { id: 'rat2', rating: 2 }],
    },
  ]),
  itemsConnection: () => ({
    aggregate: { count: 1 },
  }),
};

const mutationResolvers = {
  createRating: jest.fn(() => ({ id: '123', rating: 5 })),
};

const routerPushed = jest.fn();

Router.router = {
  push: (path) => {
    routerPushed(path);
    return new Promise((resolve, reject) => resolve());
  },
};

test('items show loading', async () => {
  const { queryByText } = render(
    <ApolloLoadingProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloLoadingProvider>,
  );
  const loading = queryByText(/loading/i);
  expect(loading).toBeTruthy();
});

test('items show error', async () => {
  const { queryByText } = render(
    <ApolloErrorProvider graphQLErrors={[{ message: 'something went wrong' }]}>
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloErrorProvider>,
  );

  await wait();

  const error = queryByText(/error/i);
  expect(error).toBeTruthy();
});

test('item renders the image', async () => {
  const { queryByAltText } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const img = queryByAltText(/candy bar/i);
  expect(img).toBeTruthy();
  expect(img).toHaveAttribute('src', 'candybar.jpg');
});

test('item renders details', async () => {
  const { queryByText } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const title = queryByText(/candy bar/i);
  expect(title).toBeTruthy();

  const description = queryByText(/chocolate/i);
  expect(description).toBeTruthy();

  const price = queryByText('$1.50');
  expect(price).toBeTruthy();
});

test('item renders the rating', async () => {
  const {
    queryByTestId,
    queryByDisplayValue,
  } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const rating = queryByTestId('rating');
  expect(rating).toHaveTextContent('3.50/5');

  const select = queryByDisplayValue('5');
  expect(select).toBeTruthy();
});

test('creates a rating', async () => {
  const { queryByDisplayValue } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
        Mutation: () => mutationResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const select = queryByDisplayValue('5');
  fireEvent.change(select, { target: { value: '2' } });

  await wait(() => expect(mutationResolvers.createRating).toHaveBeenCalled());
});

test('item renders the buttons', async () => {
  const { queryByTestId } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const editButton = queryByTestId('edit-button');
  expect(editButton).toBeTruthy();

  const addToCartButton = queryByTestId('add-to-cart-button');
  expect(addToCartButton).toBeTruthy();

  const deleteButton = queryByTestId('delete-button');
  expect(deleteButton).toBeTruthy();
});

test('edit button changes route', async () => {
  const { queryByTestId } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const editButton = queryByTestId('edit-button');
  fireEvent.click(editButton);

  await wait(() => expect(routerPushed).toHaveBeenCalledWith('/update?id=abc'));
});

test('items renders pagination', async () => {
  const { queryByTestId, queryByText } = render(
    <ApolloMockedProvider
      customResolvers={{
        Query: () => queryResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <ItemsComponent page={page} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const prevButton = queryByTestId('prev-button');
  expect(prevButton).toHaveAttribute('href', 'items?page=0');

  const nextButton = queryByTestId('next-button');
  expect(nextButton).toHaveAttribute('href', 'items?page=2');

  const pageNumber = queryByText(/page/i);
  expect(pageNumber).toHaveTextContent(/page 1 of 1/i);

  const count = queryByText(/total/i);
  expect(count).toHaveTextContent(/1 item total/i);
});
