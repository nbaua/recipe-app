const initialState = {
  favoriteRecipeIds: [],
};
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add': {
      if (state.favoriteRecipeIds.indexOf(action.payload) === -1) {
        return {
          ...state,
          favoriteRecipeIds: [...state.favoriteRecipeIds, action.payload],
        };
      } else {
        return state;
      }
    }
    case 'rem': {
      return {
        ...state,
        favoriteRecipeIds: state.favoriteRecipeIds.filter(
          element => element !== action.payload,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default favoriteReducer;
