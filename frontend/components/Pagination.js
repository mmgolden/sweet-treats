import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import PAGINATION_QUERY from '../graphql/queries/pagination';

const Pagination = ({ page }) => {
  const { loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return 'Loading...';

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>{`Sweet Treats - Page ${page} of ${pages}`}</title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}
      >
        <a
          className="prev"
          aria-disabled={page <= 1}
          data-testid="prev-button"
        >
          Prev
        </a>
      </Link>
      <p>{`Page ${page} of ${pages}`}</p>
      <p>{`${count} item${count === 1 ? '' : 's'} total`}</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}
      >
        <a
          className="next"
          aria-disabled={page >= pages}
          data-testid="next-button"
        >
          Next
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
