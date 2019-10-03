import gql from 'graphql-tag';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  const { loading, error, data } = useQuery(
    SINGLE_ITEM_QUERY,
    { variables: { id } },
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!data.item) return <p>No item found</p>;

  const { title, largeImage, description } = data.item;

  return (
    <SingleItemStyles>
      <Head>
        <title>{`Sweet Treats | ${title}`}</title>
      </Head>
      <img src={largeImage} alt={title} />
      <div className="details">
        <h2>{`Viewing ${title}`}</h2>
        <p>{description}</p>
      </div>
    </SingleItemStyles>
  );
};

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export default SingleItem;
