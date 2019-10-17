import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ItemComponent from '../components/Item';
import theme from '../components/styles/theme';
import { ApolloMockedProvider } from '../test-utils/providers';

const fakeItem = {
  id: '12345',
  title: 'Lollipop',
  price: 300,
  description: 'Candy on a stick',
  image: 'lollipop.jpg',
  largeImage: 'largeLollipop.jpg',
  ratings: [5],
};

test('<Item />', async () => {
  const wrapper = render(
    <ApolloMockedProvider>
      <ThemeProvider theme={theme}>
        <ItemComponent item={fakeItem} />
      </ThemeProvider>
    </ApolloMockedProvider>,
  );
  wrapper.debug();
});
