import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import FormattedMessage from 'grommet/components/FormattedMessage';

class ContactPage extends React.Component {
  render() {
    return (
      <Box pad="medium" full="vertical">
        <Header size="medium"/>
        <Title>
          <FormattedMessage id="Contact" defaultMessage="Contact" />
        </Title>
        <Box>
          <dl>
            <dt><FormattedMessage id="Name" defaultMessage="Name" />:</dt>
            <dd>Primož Suša</dd>
            <dt><FormattedMessage id="Email" defaultMessage="Email" />:</dt>
            <dd>primoz.susa@gmail.com</dd>
          </dl>
        </Box>
        <Footer
          size="small"
          pad={{vertical: 'small'}}
        />
      </Box>
    );
  }
}

ContactPage.propTypes = {};
ContactPage.defaultProps = {};

export default ContactPage;
