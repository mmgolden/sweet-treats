import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { ALL_ITEMS_QUERY } from './Items'; // eslint-disable-line

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id }) => {
  const [deleteItem] = useMutation(
    DELETE_ITEM_MUTATION,
    {
      update(cache, { data }) {
        const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
        cache.writeQuery({
          query: ALL_ITEMS_QUERY,
          data: { items: items.filter((item) => item.id !== data.deleteItem.id) },
        });
      },
    },
  );

  return (
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
  );
};

export default DeleteItem;
