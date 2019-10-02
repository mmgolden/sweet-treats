import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id }) => 
  // const [deleteItem, { loading, error }] = useMutation(
  //   DELETE_ITEM_MUTATION,
  //   {
  //     update(cache, { data: { deleteItem } }) {
  //       const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
  //     },
  //   },
  // );

   (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) { // eslint-disable-line
          deleteItem({
            variables: { id },
          });
        }
      }}
    >
      {children}
    </button>
  )
;

export default DeleteItem;
