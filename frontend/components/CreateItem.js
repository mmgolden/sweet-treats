import { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

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

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      createItem({
        variables: {
          image: file.image,
          largeImage: file.largeImage,
          title,
          price,
          description,
        },
      });
    }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={(e) => uploadFile(e, setFile)}
            required
          />
          {file.image && <img src={file.image} alt="Upload preview" />}
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
