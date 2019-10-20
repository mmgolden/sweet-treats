import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import Rating from './Rating';

const Item = ({ item }) => {
  const {
    id,
    title,
    price,
    description,
    image,
    ratings,
  } = item;

  return (
    <ItemStyles>
      {image && <img src={image} alt={title} />}
      <Title>
        <Link href={{
          pathname: '/item',
          query: { id },
        }}
        >
          <a>{title}</a>
        </Link>
      </Title>
      <p>{description}</p>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <Rating itemId={id} ratings={ratings} />
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: { id },
          }}
        >
          <a data-testid="edit-button">Edit</a>
        </Link>
        <AddToCart id={id} />
        <DeleteItem id={id}>Delete item</DeleteItem>
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default Item;
