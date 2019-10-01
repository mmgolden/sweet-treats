import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Item = ({
  item: {
    id,
    title,
    price,
    description,
    image,
  },
}) => (
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
    <div className="buttonList">
      <Link href={{
        pathname: '/update',
        query: { id },
      }}
      >
        <a>Edit</a>
      </Link>
      <button type="button">Add to cart</button>
      <button type="button">Delete</button>
    </div>
  </ItemStyles>
);

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default Item;
