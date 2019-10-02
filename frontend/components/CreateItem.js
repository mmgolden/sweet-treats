import { useState } from 'react';
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

const uploadFile = async (e, setFile) => {
  const { files } = e.target;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'sweettreats');

  const res = await fetch('https://api.cloudinary.com/v1_1/melindagolden/image/upload', {
    method: 'POST',
    body: data,
  });

  const file = await res.json();

  setFile({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  });
};

const CreateItem = () => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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
    image: file.image,
    largeImage: file.largeImage,
    title,
    price,
    description,
  };

  return (
    <CreateItemForm
      createItem={createItem}
      variables={variables}
      error={error}
      loading={loading}
      uploadFile={uploadFile}
      setFile={setFile}
      file={file}
      title={title}
      setTitle={setTitle}
      price={price}
      setPrice={setPrice}
      description={description}
      setDescription={setDescription}
    />
  );
};

export default CreateItem;
