import ArticleHelper from 'helpers/Article';
import get from 'lodash/get';

export default (state) => (
  {
    url: state.config.url,
    isFetching: get(state.viewPost, 'isFetching'),
    articleHelper: new ArticleHelper(get(state.viewPost, 'entity.docs[0]')),
  }
);
