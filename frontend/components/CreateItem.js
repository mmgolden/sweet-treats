import { useReducer } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import CreateItemForm from './CreateItemForm';
import reducer from '../lib/reducer';
import CREATE_ITEM_MUTATON from '../graphql/mutations/createItem';

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
    price: parseFloat(state.price),
    image: state.file.image,
    largeImage: state.file.largeImage,
  };

  delete variables.file;

  return (
    <CreateItemForm
      handleSubmit={(e) => {
        e.preventDefault();
        createItem({ variables });
        dispatch({ type: 'reset', payload: initialState });
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
