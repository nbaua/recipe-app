const __BASE_URL__ = 'http://192.168.1.4:3300/'; //'https://ns-recipe-api.herokuapp.com/';
// const __BASE_URL__ = 'http://localhost:3300/'; //'https://ns-recipe-api.herokuapp.com/';

const Gateway = {
    __LOGIN_AUTH_URL__: __BASE_URL__.concat('auth'),
    __REGISTER_USER_URL__: __BASE_URL__.concat('user'),
    __RANDOM_ITEMS_URL__: __BASE_URL__.concat('filter/random?limit={LIMIT}'),
    __RANDOM_BY_CATEGORY_URL__: __BASE_URL__.concat(
        'filter/category?limit={LIMIT}&category={CATEGORY}',
    ),
    __GET_DETAILS_BY_ID_URL__: __BASE_URL__.concat('filter/recipe?id={ID}'),
    __GET_RECIPES_WITH_PAGINATION_URL__: __BASE_URL__.concat(
        'filter/recipes?page={PAGE}&limit={LIMIT}',
    ),
    __SEARCH_RECIPES_BY_TAG_URL__: __BASE_URL__.concat(
        'filter/search?tag={TAG}&page={PAGE}&limit={LIMIT}',
    ),
    __FAVORITE_RECIPES_BY_USER_ID_URL__: __BASE_URL__.concat('favorite?id={ID}'),
    __ADD_FAVORITE_RECIPE_BY_IDS_URL__: __BASE_URL__.concat('favorite/add'),
    __REMOVE_FAVORITE_RECIPE_BY_IDS_URL__: __BASE_URL__.concat('favorite/remove'),
    __LIKED_RECIPES_BY_USER_ID_URL__: __BASE_URL__.concat('liked?id={ID}'),
    __ADD_LIKED_RECIPE_BY_IDS_URL__: __BASE_URL__.concat('liked/add'),
    __REMOVE_LIKED_RECIPE_BY_IDS_URL__: __BASE_URL__.concat('liked/remove'),
};

export default Gateway;