import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const CreateItemForm = ({
  createItem,
  variables,
  error,
  loading,
  uploadFile,
  setFile,
  file,
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
}) => (
  <Form onSubmit={(e) => {
    e.preventDefault();
    createItem({
      variables: { ...variables },
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

export default CreateItemForm;
