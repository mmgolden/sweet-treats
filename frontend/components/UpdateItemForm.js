import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const UpdateItemForm = ({
  handleSubmit,
  mutationError,
  mutationLoading,
  item: {
    title,
    price,
    description,
  },
  dispatch,
}) => (
  <Form onSubmit={handleSubmit}>
    <ErrorMessage error={mutationError} />
    <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => dispatch({ type: 'title', payload: e.target.value })}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          defaultValue={price}
          onChange={(e) => dispatch({ type: 'price', payload: e.target.value })}
        />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Enter a description"
          defaultValue={description}
          onChange={(e) => dispatch({ type: 'description', payload: e.target.value })}
        />
      </label>
      <button type="submit">Save changes</button>
    </fieldset>
  </Form>
);

export default UpdateItemForm;
