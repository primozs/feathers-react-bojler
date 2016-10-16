import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Helmet from 'react-helmet';
import { AboveTheFoldOnlyServerRender } from 'above-the-fold-only-server-render';

const ContactPage = () => {
  return (
    <Box pad="medium" full="vertical">
      <FormattedMessage id="Contact" defaultMessage="Contact">
        {(message) => <Helmet title={message} />}
      </FormattedMessage>

      <Header size="medium" />
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
      <AboveTheFoldOnlyServerRender skip={true}>
        <Footer
          size="small"
          pad={{ vertical: 'small' }}
        />
      </AboveTheFoldOnlyServerRender>
    </Box>
  );
};

ContactPage.propTypes = {};
ContactPage.defaultProps = {};

export default ContactPage;
