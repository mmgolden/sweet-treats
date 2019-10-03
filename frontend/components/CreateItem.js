import { useReducer } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CreateItemForm from './CreateItemForm';
import { reducer } from './helpers';

export const CREATE_ITEM_MUTATON = gql`
  mutation CREATE_ITEM_MUTATON(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const uploadFile = async (e) => {
  const { files } = e.target;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'sweettreats');

  const res = await fetch('https://api.cloudinary.com/v1_1/melindagolden/image/upload', {
    method: 'POST',
    body: data,
  });

  const file = await res.json();

  return {
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  };
};

const CreateItem = () => {
  const initialState = {
    file: {},
    title: '',
    price: '',
    description: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [createItem, { loading, error }] = useMutation(
    CREATE_ITEM_MUTATON,
    {
      onCompleted({ createItem: { id } }) {
        Router.push({
          pathname: '/item',
          query: { id },
        });
      },
    },
  );

  if (loading) return 'Loading...';

  const variables = {
    ...state,
    image: state.file.image,
    largeImage: state.file.largeImage,
  };

  delete variables.file;

  return (
    <CreateItemForm
      handleSubmit={(e) => {
        e.preventDefault();
        createItem({
          variables: { ...variables },
        });
      }}
      error={error}
      loading={loading}
      dispatch={dispatch}
      uploadFile={uploadFile}
      {...state}
    />
  );
};

export default CreateItem;
