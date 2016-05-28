import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Paragraph from 'grommet/components/Paragraph';

class HomePage extends React.Component {
  render() {
    return (
      <Box pad="medium" full="vertical">
        <Header size="medium"/>
        <Title>
          <FormattedMessage id="appTitle" defaultMessage="appTitle" />
        </Title>
        <Paragraph>
          <FormattedMessage id="aboutThisApp" defaultMessage="aboutThisApp" />
        </Paragraph>
        <Footer
          size="small"
          pad={{vertical: 'small'}}
        />
      </Box>
    );
  }
}

HomePage.propTypes = {};
HomePage.defaultProps = {};

export default HomePage;
