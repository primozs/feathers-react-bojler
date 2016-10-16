import React from 'react';

class FeathersProvider extends React.Component {
  getChildContext() {
    return {
      feathers: this.props.feathers,
      feathersJwt: this.props.feathersJwt
    };
  }

  render() {
    return this.props.children;
  }
}

FeathersProvider.displayName = 'FeathersProvider';

FeathersProvider.propTypes = {
  children: React.PropTypes.any,
  feathers: React.PropTypes.object,
  feathersJwt: React.PropTypes.string
};

FeathersProvider.defaultProps = {
  feathersJwt: ''
};

FeathersProvider.childContextTypes = {
  feathers: React.PropTypes.object.isRequired,
  feathersJwt: React.PropTypes.string
};

export default FeathersProvider;
module.exports = FeathersProvider;
