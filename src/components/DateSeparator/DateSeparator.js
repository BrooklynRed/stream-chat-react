import React from 'react';
import PropTypes from 'prop-types';

import { withTranslationContext } from '../../context';

/**
 * DateSeparator - A simple date separator
 *
 * @example ../../docs/DateSeparator.md
 * @extends PureComponent
 */
const DateSeparator = ({ position, tDateTimeParser, formatDate, date }) => {
  if (!Date.parse(date)) return null;

  return (
    <div className="str-chat__date-separator">
      {(position === 'right' || position === 'center') && <hr className="str-chat__date-separator-line" />}
      <div className="str-chat__date-separator-date">
        {formatDate ? formatDate(date) : tDateTimeParser(date.toISOString()).calendar()}
      </div>
      {(position === 'left' || position === 'center') && <hr className="str-chat__date-separator-line" />}
    </div>
  );
};

DateSeparator.defaultProps = {
  position: 'right',
};

DateSeparator.propTypes = {
  /** The date to format */
  date: PropTypes.instanceOf(Date),
  /** Set the position of the date in the separator */
  position: PropTypes.oneOf(['left', 'center', 'right']),
  /** Override the default formatting of the date. This is a function that has access to the original date object. Returns a string or Node  */
  formatDate: PropTypes.func,
};

export default withTranslationContext(React.memo(DateSeparator));
