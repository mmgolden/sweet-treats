const getTotalItems = (cart) => cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

export default getTotalItems;
