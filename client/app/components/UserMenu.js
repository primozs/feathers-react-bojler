import React from 'react';
import Menu from 'grommet/components/Menu';
import MenuItem from './MenuItem';

class UserMenu extends React.Component { // eslint-disable-line
  render() {
    let userMenuItems = [];

    this.props.menuItems.forEach((item) => {
      if (typeof item.auth === 'undefined' ||
        item.auth === this.props.isAuthenticated) {
        userMenuItems = [
          ...userMenuItems,
          <MenuItem
            key={item.label} item={item} value={item.loc}
            onClick={this.props.onMenuClick}
          />
        ];
      }
    });

    return (
      <Menu
        pad={this.props.pad}
        direction={this.props.direction}
        align={this.props.align}
        responsive={this.props.responsive}
      >
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
