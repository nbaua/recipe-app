const addToFavorite = data => {
  return {
    type: 'add',
    payload: data,
  };
};
const removeFromFavorite = data => {
  return {
    type: 'rem',
    payload: data,
  };
};
export {addToFavorite, removeFromFavorite};
