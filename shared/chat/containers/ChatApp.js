import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Split from 'grommet/components/Split';
import ComposeMessage from '../components/ComposeMessage';
import MessageList from '../components/MessageList';
import ChatSidebar from '../components/ChatSidebar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActionCreators from '../actions/chatActions';

class ChatApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const userService = this.context.feathers.service('users');
    this.props.chatActions.findUsers(userService);

    const messageService = this.context.feathers.service('messages');
    this.props.chatActions.findMessages({
      query: {
        $sort: {createdAt: 1},
        $limit: this.props.limit || 10
      }
    }, messageService);


  }

  sendMessage(text) {
    this.props.chatActions.sendMessage(text, this.context.feathers);
  }

  render() {
    return (
      <Split flex="right" fixed={true}>
        <ChatSidebar users={this.props.chat.users} />
        <Box fixed={true}>
          <Header size="medium"/>
          <MessageList
            users={this.props.chat.users}
            messages={this.props.chat.messages}
          />
          <ComposeMessage sendMessage={this.sendMessage}/>
        </Box>
      </Split>
    );
  }
}

ChatApp.propTypes = {
  chat: React.PropTypes.object
};
ChatApp.defaultProps = {};
ChatApp.contextTypes = {
  feathers: React.PropTypes.object
};

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
