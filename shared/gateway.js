const __BASE_URL__ = 'http://172.17.238.17:3000/'; //'https://ns-recipe-api.herokuapp.com/';

export default {
  __LOGIN_AUTH_URL__: __BASE_URL__.concat('auth'),
  __REGISTER_USER_URL__: __BASE_URL__.concat('user'),
  __RANDOM_ITEMS_URL__: __BASE_URL__.concat('filter/random?limit={LIMIT}'),
  __RANDOM_BY_CATEGORY_URL__: __BASE_URL__.concat(
    'filter/category?limit={LIMIT}&category={CATEGORY}',
  ),
  __GET_DETAILS_BY_ID_URL__: __BASE_URL__.concat('filter/recipe?id={ID}'),
};
