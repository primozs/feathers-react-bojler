import React from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Logo from './Logo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../app/actions/authActions';
import UserMenu from './UserMenu';
import LangMenu from './LangMenu';

class AppHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onMenuClick(location) {
    if (location === '/logout') {
      this.props.authActions.logOut(this.context.feathers);
    } else {
      this.context.router.push(location);
    }
  }

  render() {
    let mainMenuItems = this.props.nav.mainMenu.map((item) => {
      return (
        <Anchor
          key={item.label}
          label={<FormattedMessage id={item.label} defaultMessage={item.label}/>}
          onClick={this.onMenuClick.bind(this, item.loc)}
        />
      );
    });

    let userEmail = null;
    if (this.props.auth.user) {
      let email = this.props.auth.user.email.split('@')[0];
      userEmail = (
        <Menu direction="row" pad={{horizontal: 'small'}}>
          <Anchor>{email}</Anchor>
        </Menu>
      );
    }

    return (
      <Header
        fixed={true}
        float={true}
        direction="row"
        size={'small'}
        justify="between"
        colorIndex="neutral-1"
        pad={{horizontal: 'small'}}>
        <Title pad={{horizontal: 'small'}}>
          <Logo size="small"/>
          <span><FormattedMessage id="appTitle" defaultMessage="React Feathers"/></span>
          <Menu direction="row" align="start" responsive={false}>
            {mainMenuItems}
          </Menu>
        </Title>
        <Box direction="row">
          <UserMenu
            menuItems={this.props.nav.userMenu}
            isAuthenticated={this.props.auth.isAuthenticated}
            onMenuClick={this.onMenuClick.bind(this)}
          />
          {userEmail}
        <LangMenu
          dropAlign={{right: 'right', top: 'top', direction: 'right'}}
          menuItems={this.props.nav.languages}
        />
        </Box>
      </Header>
    );
  }
}

AppHeader.propTypes = {
  nav: React.PropTypes.object,
  auth: React.PropTypes.object,
  authActions: React.PropTypes.object
};

AppHeader.defaultProps = {};

AppHeader.contextTypes = {
  router: React.PropTypes.object,
  feathers: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    nav: state.nav,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
