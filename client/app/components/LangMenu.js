import React from 'react';
import Menu from 'grommet/components/Menu';
import Drop from 'grommet/utils/Drop';
import Language from 'grommet/components/icons/base/Language';
import Cookies from 'grommet/utils/Cookies';
import MenuItem from './MenuItem';

class LangMenu extends React.Component {
  onLanguageSelect(language) {
    Cookies.set('language', language);
    window.location = window.location.href;
  }

  render() {
    const { dropAlign, menuItems } = this.props;
    const links = menuItems.map((item, index) => {
      const key = `${item.label}-${index}`;
      return (
        <MenuItem
          key={key} item={item} value={item.language}
          onClick={this.onLanguageSelect}
        />
      );
    });
    return (
      <Menu
        size="small"
        dropAlign={dropAlign}
        responsive={true}
        icon={<Language colorIndex="brand" />}
      >
        {links}
      </Menu>
    );
  }
}

LangMenu.displayName = 'LangMenu';

LangMenu.propTypes = {
  dropAlign: Drop.alignPropType,
  menuItems: React.PropTypes.array
};

LangMenu.defaultProps = {
  direction: 'down'
};

export default LangMenu;
