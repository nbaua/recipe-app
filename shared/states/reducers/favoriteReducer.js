const initialState = {
  favoriteRecipeIds: [],
};
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        favoriteRecipeIds: [...state.favoriteRecipeIds, action.payload],
      };
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
