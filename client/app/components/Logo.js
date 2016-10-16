import React, { PropTypes } from 'react';

const Logo = ({ size, title }) => {
  let options;

  switch (size) {
    case 'small':
      options = { width: '35px' };
      break;
    default:
      options = { width: '50px' };
  }

  return (
    <div className="logo" style={{ margin: '10px' }}>
      <img src="/favicon.png" alt={title} {...options} />
    </div>
  );
};

Logo.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string
};

Logo.defaultProps = {
  size: 'full'
};

export default Logo;
