import React from 'react';
import PropTypes from 'prop-types';

import LoadMoreButton from './LoadMoreButton';
import { smartRender } from '../../utils';

const LoadMorePaginator = ({ reverse, hasNextPage, refreshing, loadNextPage, children }) => (
  <>
    {!reverse && children}
    {hasNextPage && smartRender(LoadMoreButton, { refreshing, onClick: loadNextPage })}
    {reverse && children}
  </>
);

LoadMorePaginator.defaultProps = {
  LoadMoreButton,
};

LoadMorePaginator.propTypes = {
  LoadMoreButton: PropTypes.elementType,
  /** callback to load the next page */
  loadNextPage: PropTypes.func,
  /** indicates if there is a next page to load */
  hasNextPage: PropTypes.bool,
  /** display the items in opposite order */
  reverse: PropTypes.bool,
};

export default React.memo(LoadMorePaginator);
