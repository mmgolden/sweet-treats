import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const UpdateItemForm = ({
  updateItem,
  variables,
  mutationError,
  mutationLoading,
  item,
  setTitle,
  setPrice,
  setDescription,
}) => (
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
          defaultValue={item.title}
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
          defaultValue={item.price}
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
          defaultValue={item.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Save changes</button>
    </fieldset>
  </Form>
);

export default UpdateItemForm;
