import React from 'react';

class Logo extends React.Component {
  render() {
    let size = this.props.size;
    let options;

    switch(size) {
      case 'small':
        options = {width: '35px', ...options};
    }

    return (
      <div className="logo" style={{margin: '10px'}}>
        <img src="/favicon.png" alt={this.props.title} {...options}/>
      </div>
    );
  }
}

Logo.propTypes = {
  size: React.PropTypes.string
};
Logo.defaultProps = {
  size: 'full'
};

export default Logo;
