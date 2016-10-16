import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import FormattedMessage from 'grommet/components/FormattedMessage';

class MenuItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.value);
  }

  render() {
    const { item } = this.props;
    return (
      <Anchor
        label={
          <FormattedMessage id={item.label} defaultMessage={item.label} />
        }
        onClick={this.onClick}
      />
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object,
  value: PropTypes.any,
  onClick: PropTypes.func
};

MenuItem.defaultProps = {};

export default MenuItem;
