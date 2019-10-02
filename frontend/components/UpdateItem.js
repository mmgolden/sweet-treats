import { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { removeEmptyStrings } from './helpers';
import UpdateItemForm from './UpdateItemForm';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
    ) {
      id
      title
      price
      description
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const { loading: queryLoading, error: queryError, data } = useQuery(
    SINGLE_ITEM_QUERY,
    { variables: { id } },
  );

  const [
    updateItem,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_ITEM_MUTATION);

  if (queryLoading) return 'Loading...';
  if (queryError) return `Error! ${queryError.message}`;

  if (!data.item) return <p>No item found</p>;

  const variables = removeEmptyStrings({
    id,
    title,
    price,
    description,
  });

  return (
    <UpdateItemForm
      updateItem={updateItem}
      variables={variables}
      mutationError={mutationError}
      mutationLoading={mutationLoading}
      item={data.item}
      setTitle={setTitle}
      setPrice={setPrice}
      setDescription={setDescription}
    />
  );
};

export default UpdateItem;
