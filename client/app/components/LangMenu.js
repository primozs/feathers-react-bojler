import React from 'react';
import Menu from 'grommet/components/Menu';
import Drop from 'grommet/utils/Drop';
import Anchor from 'grommet/components/Anchor';
import Language from 'grommet/components/icons/base/Language';
import Cookies from 'grommet/utils/Cookies';
import FormattedMessage from 'grommet/components/FormattedMessage';

class LangMenu extends React.Component {
  onLanguageSelect(language) {
    Cookies.set('language', language);
    window.location = window.location.href;
  }

  render() {
    let { dropAlign, menuItems } = this.props;

    let links = menuItems.map((item, index) => {
      let key = `${item.label}-${index}`;
      return (
        <Anchor
          key={key}
          label={<FormattedMessage id={item.label} defaultMessage={item.label} />}
          onClick={this.onLanguageSelect.bind(this, item.language)}
        />
      );
    });
    return (
      <Menu
        size="small"
        dropAlign={dropAlign}
        responsive={true}
        icon={<Language colorIndex="brand"/>}>
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
