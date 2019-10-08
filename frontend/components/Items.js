import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';
import ALL_ITEMS_QUERY from '../graphql/queries/allItems';

const Items = ({ page }) => {
  const { loading, error, data } = useQuery(
    ALL_ITEMS_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
      },
    },
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Center>
      <ItemsList>
        {data.items.map((item) => <Item item={item} key={item.id} />)}
      </ItemsList>
      <Pagination page={page} />
    </Center>
  );
};

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};

  @media (min-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default Items;
