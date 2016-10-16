import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Split from 'grommet/components/Split';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComposeMessage from '../components/ComposeMessage';
import MessageList from '../components/MessageList';
import ChatSidebar from '../components/ChatSidebar';
import * as chatActionCreators from '../actions/chatActions';

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
        $sort: { createdAt: 1 },
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
        <ChatSidebar users={this.props.chat.users} />
        <Box fixed={true}>
          <Header size="medium" />
          <MessageList
            users={this.props.chat.users}
            messages={this.props.chat.messages}
          />
          <ComposeMessage sendMessage={this.sendMessage} />
          <Footer size="large" />
        </Box>
      </Split>
    );
  }
}

ChatApp.propTypes = {
  chat: PropTypes.object,
  chatActions: PropTypes.object,
  limit: PropTypes.number
};
ChatApp.defaultProps = {};

ChatApp.contextTypes = {
  feathers: React.PropTypes.object
};

ChatApp.need = [
  // (params) => {
  //  return authActionCreators.keepLoginServer(params.feathersJwt, params.feathers);
  // },
  (params) => {
    return chatActionCreators.findUsers(params.feathers.service('users'));
  }
];

function mapStateToProps(state) {
  return {
    chat: state.chat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatApp);
