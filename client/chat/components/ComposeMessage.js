import React from 'react';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Form from 'grommet/components/Form';
import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';

class ComposeMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };

    this.updateText = this.updateText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(event) {
    event.preventDefault();
    this.props.sendMessage(this.state.text);
    this.setState({ text: '' });
  }

  updateText(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }

  render() {
    const message = <FormattedMessage id="Message" defaultMessage="Message" />;

    return (
      <Box pad="small" align="center">
        <Form onSubmit={this.sendMessage}>
          <fieldset>
            <FormField htmlFor="email" label={message}>
              <input
                id="text"
                ref={(refobj) => {
                  this.inputObj = refobj;
                }}
                type="text"
                value={this.state.text}
                onChange={this.updateText}
              />
            </FormField>
          </fieldset>
        </Form>
      </Box>
    );
  }
}

ComposeMessage.propTypes = {
  sendMessage: React.PropTypes.func.isRequired
};
ComposeMessage.defaultProps = {};

export default ComposeMessage;
