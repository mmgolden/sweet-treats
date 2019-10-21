import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render, wait, fireEvent,
} from '@testing-library/react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import CreateItemComponent from '../components/CreateItem';
import theme from '../components/styles/theme';
import { ApolloMockedProvider } from '../test-utils/providers';

global.fetch = require('jest-fetch-mock');

const mutationResolvers = {
  createItem: jest.fn(() => ({ id: 'abc' })),
};

const routerPushed = jest.fn();

Router.router = {
  push: (path) => {
    routerPushed(path);
    return new Promise((resolve) => resolve());
  },
};

test('uploads a file', async () => {
  const image = 'https://candy.com/gummies.jpg';

  fetch.mockResponseOnce(JSON.stringify({
    secure_url: image,
    eager: [{ secure_url: image }],
  }));

  const { queryByLabelText, queryByAltText } = render(
    <ApolloMockedProvider>
      <ThemeProvider theme={theme}>
        <CreateItemComponent />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  const file = queryByLabelText(/image/i);
  fireEvent.change(file, { target: { files: ['gummies.jpg'] } });

  await wait(() => {
    const img = queryByAltText(/upload preview/i);
    expect(img).toHaveAttribute('src', 'https://candy.com/gummies.jpg');
  });
});

test('submits the form', async () => {
  const { queryByLabelText, queryByText } = render(
    <ApolloMockedProvider
      customResolvers={{
        Mutation: () => mutationResolvers,
      }}
    >
      <ThemeProvider theme={theme}>
        <CreateItemComponent />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );

  await wait();

  const title = queryByLabelText(/title/i);
  fireEvent.change(title, { target: { value: 'Gummies' } });

  const price = queryByLabelText(/price/i);
  fireEvent.change(price, { target: { value: '300' } });

  const description = queryByLabelText(/description/i);
  fireEvent.change(description, { target: { value: 'Assorted gummy candy' } });

  const submitButton = queryByText(/submit/i);
  fireEvent.click(submitButton);

  await wait(() => {
    expect(mutationResolvers.createItem).toHaveBeenCalled();
    expect(routerPushed).toHaveBeenCalledWith({ pathname: '/item', query: { id: 'abc' } });
  });
});
