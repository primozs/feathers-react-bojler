import React from 'react';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import FormattedMessage from 'grommet/components/FormattedMessage';

class UserMenu extends React.Component {
  onMenuClick(item) {
    this.props.onMenuClick(item);
  }

  render() {
    let userMenuItems = this.props.menuItems.map((item) => {
      if (typeof item.auth === 'undefined' ||
        item.auth === this.props.isAuthenticated) {
        return (
          <Anchor
            key={item.label}
            label={<FormattedMessage id={item.label} defaultMessage={item.label}/>}
            onClick={this.onMenuClick.bind(this, item.loc)}
          />
        );
      }
    });

    return (
      <Menu
        pad={this.props.pad}
        direction={this.props.direction}
        align={this.props.align}
        responsive={this.props.responsive}>
        {userMenuItems}
      </Menu>
    );
  }
}

UserMenu.propTypes = {
  menuItems: React.PropTypes.array,
  isAuthenticated: React.PropTypes.bool,
  direction: React.PropTypes.string,
  pad: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  align: React.PropTypes.string,
  responsive: React.PropTypes.bool,
  onMenuClick: React.PropTypes.func.isRequired
};
UserMenu.defaultProps = {
  menuItems: [],
  isAuthenticated: false,
  direction: 'row',
  align: 'end',
  pad: 'none',
  responsive: false
};

export default UserMenu;
