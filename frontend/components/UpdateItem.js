import { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { removeEmptyStrings } from './helpers';

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
    <Form onSubmit={(e) => {
      e.preventDefault();
      updateItem({ variables: { ...variables } });
    }}
    >
      <ErrorMessage error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={data.item.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            defaultValue={data.item.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Enter a description"
            defaultValue={data.item.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Save changes</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
