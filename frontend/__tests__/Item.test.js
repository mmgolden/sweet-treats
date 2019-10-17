import '@testing-library/jest-dom/extend-expect'
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
  ratings: [{ id: '123', rating: 5 }, { id: '456', rating: 2 }],
};

describe('<Item />', () => {
  it('renders the image', () => {
    const { queryByAltText } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
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
    expect(title).toBeTruthy();
    const price = queryByText('$3.00');
    expect(price).toBeTruthy();
  });

  it('renders the rating', () => {
    const { queryByText } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
    const rating = queryByText('Rating', { exact: false });
    expect(rating).toHaveTextContent('3.50/5');
  });

  it('renders the buttons', () => {
    const { queryByTestId } = render(
      <ApolloMockedProvider>
        <ThemeProvider theme={theme}>
          <ItemComponent item={fakeItem} />
        </ThemeProvider>
      </ApolloMockedProvider>,
    );
    const editButton = queryByTestId('editButton');
    expect(editButton).toBeTruthy();
    const addToCartButton = queryByTestId('addToCartButton');
    expect(addToCartButton).toBeTruthy();
    const deleteButton = queryByTestId('deleteButton');
    expect(deleteButton).toBeTruthy();
  });
});