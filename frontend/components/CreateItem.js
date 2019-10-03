import { useReducer } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CreateItemForm from './CreateItemForm';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'file':
      return { ...state, file: action.payload };
    case 'title':
      return { ...state, title: action.payload };
    case 'price':
      return { ...state, price: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    default:
      throw new Error();
  }
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

  return (
    <CreateItemForm
      handleSubmit={(e) => {
        e.preventDefault();
        createItem({
          variables: {
            ...state,
            image: state.file.image,
            largeImage: state.file.largeImage,
          },
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
