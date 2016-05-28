import React, { PropTypes as T} from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Image from 'grommet/components/Image';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import FormattedMessage from 'grommet/components/FormattedMessage';
import UserMenu from '../../app/components/UserMenu';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const PLACEHOLDER = 'https://placeimg.com/60/60/people';

class ChatSidebar extends React.Component {

  onMenuClick(location) {
    this.props.dispatch(push(location));
  }

  render() {
    const users = this.props.users;

    return (
      <Sidebar fixed={true} size="medium" colorIndex="light-2">
        <Header size="medium"/>
        <Header
          size="small"
          justify="between"
          pad={{horizontal: 'medium'}}>
          <Title>
            <FormattedMessage
              id="users"
              defaultMessage="{itemCount, plural, =0 {User} one {User} other {# Users}}"
              values={{itemCount: users.length}} />
          </Title>
        </Header>
        <ul>
          {
            users.map((user) => {
              return (
                <li>
                  <a href="#">
                    <Image src={user.avatar || PLACEHOLDER} size="thumb"/>
                    <span style={{padding: '10px'}}>{user.email}</span>
                  </a>
                </li>
              );
            })
          }
        </ul>
        <UserMenu
          pad={{vertical: 'small', horizontal: 'medium'}}
          menuItems={this.props.nav.userMenu}
          isAuthenticated={this.props.auth.isAuthenticated}
          onMenuClick={this.onMenuClick.bind(this)}
        />
        <Footer size="medium"/>
      </Sidebar>
    );
  }
}

ChatSidebar.propTypes = {
  users: T.array,
  nav: T.object,
  auth: T.object,
  dispatch: T.func
};
ChatSidebar.defaultProps = {
  users: []
};

function mapStateToProps(state) {
  return {
    nav: state.nav,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

export default connect(
  mapStateToProps
)(ChatSidebar);
