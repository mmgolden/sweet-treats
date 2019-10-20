import { useMutation } from '@apollo/react-hooks';
import ALL_ITEMS_QUERY from '../graphql/queries/allItems';
import DELETE_ITEM_MUTATION from '../graphql/mutations/deleteItem';

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
          }).catch((err) => alert(err.message)); // eslint-disable-line
        }
      }}
      data-testid="delete-button"
    >
      {children}
    </button>
  );
};

export default DeleteItem;
