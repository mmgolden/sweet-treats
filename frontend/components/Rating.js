import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import Select from './Select';
import CREATE_RATING_MUTATION from '../graphql/mutations/createRating';
import getRatingAverage from '../lib/getRatingAverage';
import ALL_ITEMS_QUERY from '../graphql/queries/allItems';

const ratingOptions = [1, 2, 3, 4, 5];

const Rating = ({
  itemId,
  ratings,
}) => {
  const [createRating] = useMutation(
    CREATE_RATING_MUTATION,
    {
      refetchQueries: [{ query: ALL_ITEMS_QUERY }],
    },
  );

  const ratingAverage = getRatingAverage(ratings);

  return (
    <RatingStyles>
      <p data-testid="rating">{`Rating: ${ratings.length > 0 ? `${ratingAverage}/5` : '0'}`}</p>
      <Select
        name="ratingSelect"
        label="Rate item:"
        defaultValue={5}
        options={ratingOptions}
        handleChange={(e) => {
          const inputRating = parseFloat(e.target.value);
          createRating({
            variables: {
              id: itemId,
              rating: inputRating,
            },
          });
        }}
      />
    </RatingStyles>
  );
};

const RatingStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  p {
    flex-grow: unset;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export default Rating;
