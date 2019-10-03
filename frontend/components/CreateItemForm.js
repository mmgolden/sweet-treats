import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const CreateItemForm = ({
  handleSubmit,
  error,
  loading,
  file,
  title,
  price,
  description,
  dispatch,
  uploadFile,
}) => (
  <Form onSubmit={handleSubmit}>
    <ErrorMessage error={error} />
    <fieldset disabled={loading} aria-busy={loading}>
      <label htmlFor="file">
        Image
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          onChange={async (e) => {
            const imageFiles = await uploadFile(e);
            dispatch({ type: 'file', payload: imageFiles });
          }}
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
          onChange={(e) => dispatch({ type: 'title', payload: e.target.value })}
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
          onChange={(e) => dispatch({ type: 'price', payload: e.target.value })}
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
          onChange={(e) => dispatch({ type: 'description', payload: e.target.value })}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </fieldset>
  </Form>
);

export default CreateItemForm;
