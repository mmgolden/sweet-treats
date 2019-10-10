import { useState } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import SEARCH_ITEMS_QUERY from '../graphql/queries/searchItems';

const AutoComplete = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = debounce(async (e, client) => {
    setLoading(true);
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    setItems(res.data.items);
    setLoading(false);
  }, 350);

  const routeToItem = (item) => {
    Router.push({
      pathname: '/item',
      query: {
        id: item.id,
      },
    });
  };

  resetIdCounter();

  return (
    <SearchStyles>
      <Downshift
        itemToString={(item) => (item === null ? '' : item.title)}
        onChange={routeToItem}
      >
        {({
          getInputProps, getItemProps, isOpen, inputValue, highlightedIndex,
        }) => (
          <div>
            <ApolloConsumer>
              {(client) => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'Search for an item',
                    id: 'search',
                    className: loading ? 'loading' : '',
                    onChange: (e) => {
                      e.persist();
                      handleChange(e, client);
                    },
                  })}
                />
              )}
            </ApolloConsumer>
            {isOpen && (
              <DropDown>
                {items.map((item, index) => (
                  <DropDownItem
                    key={item.id}
                    highlighted={index === highlightedIndex}
                    {...getItemProps({ item })}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
                {!items.length && !loading && (
                  <DropDownItem>{`Nothing found for ${inputValue}`}</DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
};

export default AutoComplete;
