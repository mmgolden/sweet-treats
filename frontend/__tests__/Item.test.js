import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import ItemComponent from '../components/Item';
import theme from '../components/styles/theme';
import CREATE_RATING_MUTATION from '../graphql/mutations/createRating';

const fakeItem = {
  id: '12345',
  title: 'Lollipop',
  price: 300,
  description: 'Candy on a stick',
  image: 'lollipop.jpg',
  largeImage: 'largeLollipop.jpg',
  ratings: [5],
};

const mocks = [
  {
    request: {
      query: CREATE_RATING_MUTATION,
      variables: {
        id: fakeItem.id,
        rating: 5,
      },
    },
    result: { data: { createRating: { id: '5678', rating: 5 } } },
  },
];

test('<Item />', () => {
  const wrapper = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={theme}>
        <ItemComponent item={fakeItem} />
      </ThemeProvider>
    </MockedProvider>,
  );
  wrapper.debug();
});
