import ArticleHelper from 'helpers/Article';
import get from 'lodash/get';

export default (state) => (
  {
    isFetching: get(state.viewPage, 'isFetching'),
    articleHelper: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
  }
);
