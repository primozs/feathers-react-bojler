import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Split from 'grommet/components/Split';
import ComposeMessage from '../components/ComposeMessage';
import MessageList from '../components/MessageList';
import ChatSidebar from '../components/ChatSidebar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActionCreators from '../actions/chatActions';
import * as authActionCreators from '../../app/actions/authActions';

class ChatApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const { feathers } = this.context;
    const userService = feathers.service('users');
    this.props.chatActions.findUsers(userService);

    userService.on('created', (user) => {
      this.props.chatActions.getUserSuccess(user);
    });

    const messageService = feathers.service('messages');
    this.props.chatActions.findMessages({
      query: {
        $sort: {createdAt: 1},
        $limit: this.props.limit || 10
      }
    }, messageService);

    messageService.on('created', (message) => {
      this.props.chatActions.sendMessageSuccess(message);
    });
  }

  sendMessage(text) {
    this.props.chatActions.sendMessage(text, this.context.feathers);
  }

  render() {
    return (
      <Split flex="right" fixed={true}>
        <ChatSidebar users={this.props.chat.users}/>
        <Box fixed={true}>
          <Header size="medium"/>
          <MessageList
            users={this.props.chat.users}
            messages={this.props.chat.messages}
          />
          <ComposeMessage sendMessage={this.sendMessage}/>
          <Footer size="large"/>
        </Box>
      </Split>
    );
  }
}

ChatApp.propTypes = {
  auth: React.PropTypes.object,
  authActions: React.PropTypes.object,
  chat: React.PropTypes.object,
  chatActions: React.PropTypes.object
};
ChatApp.defaultProps = {};

ChatApp.contextTypes = {
  feathers: React.PropTypes.object
};

ChatApp.need = [
  //(params) => {
  //  console.log('SERVER AUTHENTICATE keepLogin');
  //  return authActionCreators.keepLoginServer(params.feathersJwt, params.feathers);
  //},
  (params) => {
    console.log('SERVER CHATAPP findUsers');
    return chatActionCreators.findUsers(params.feathers.service('users'));
  }
];

function mapStateToProps(state) {
  return {
    auth: state.auth,
    chat: state.chat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    chatActions: bindActionCreators(chatActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatApp);
