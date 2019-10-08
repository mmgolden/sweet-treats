import { useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import removeEmptyStrings from '../lib/removeEmptyStrings';
import UpdateItemForm from './UpdateItemForm';
import SINGLE_ITEM_QUERY from '../graphql/queries/singleItem';
import reducer from '../lib/reducer';
import UPDATE_ITEM_MUTATION from '../graphql/mutations/updateItem';

const UpdateItem = ({ id }) => {
  const initialState = {
    title: '',
    price: '',
    description: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <UpdateItemForm
      handleSubmit={(e) => {
        e.preventDefault();
        updateItem({
          variables: removeEmptyStrings({
            ...state,
            id,
          }),
        });
      }}
      mutationError={mutationError}
      mutationLoading={mutationLoading}
      item={data.item}
      dispatch={dispatch}
    />
  );
};

export default UpdateItem;
