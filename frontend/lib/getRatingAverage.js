const getRatingAverage = (ratings) => {
  const ratingTotal = ratings.reduce((total, { rating }) => total + rating, 0);
  return (ratingTotal / ratings.length).toFixed(2);
};

export default getRatingAverage;
