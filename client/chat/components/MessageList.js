import React from 'react';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import FormattedMessage from 'grommet/components/FormattedMessage';
import { FormattedDate, FormattedRelative } from 'react-intl';
import moment from 'moment';

const PLACEHOLDER = 'https://placeimg.com/60/60/people';

class MessageList extends React.Component {
  render() {
    const dummyUser = {
      avatar: PLACEHOLDER,
      email: <FormattedMessage id="Anonymous" defaultMessage="Anonymous"/>
    };

    let items = this.props.messages.map((message) => {
      const sender = typeof message.sentBy === 'object' ?
        message.sentBy : dummyUser;

      const style = {
        dl: {
          margin: '0px'
        },
        dd: {
          margin: '0px'
        }
      };

      return (
        <ListItem key={message.id} direction="column" align="start">
          <Box direction="row">
            <Box>
              <Image src={sender.avatar || PLACEHOLDER} size="thumb"/>
            </Box>
            <Box direction="column">
              <Box direction="row">
                <Box pad={{horizontal: 'small'}}>
                  <Paragraph margin="none" size="small">
                    {sender.email}
                  </Paragraph>
                </Box>
                <Box pad={{horizontal: 'small'}}>
                  <Paragraph margin="none" size="small">
                    {
                      // moment(message.createdAt).format('MMM Do, hh:mm:ss')
                    }
                    <FormattedRelative value={moment(message.createdAt)} /> {' '}
                    <FormattedDate value={moment(message.createdAt)} />
                  </Paragraph>
                </Box>
              </Box>
              <Box pad={{horizontal: 'small'}}>
                <dl style={style.dl}>
                  <dt><FormattedMessage id="Message" defaultMessage="Message"/>:</dt>
                  <dd style={style.dd}>{message.text}</dd>
                </dl>
              </Box>
            </Box>
          </Box>
        </ListItem>
      );
    });

    return (
      <List>
        {items}
      </List>
    );
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.array,
  users: React.PropTypes.array
};
MessageList.defaultProps = {};

export default MessageList;
