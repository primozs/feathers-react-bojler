import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import FormattedMessage from 'grommet/components/FormattedMessage';
import { connect } from 'react-redux';

const UserProfilePage = ({ auth }) => {
  let emailValue = null;

  if (auth.user && 'email' in auth.user) {
    emailValue = (
      <dd>{auth.user.email}</dd>
    );
  }

  return (
    <Box pad="medium" full="vertical">
      <Header size="medium" />
      <Title>
        <FormattedMessage id="Profile" defaultMessage="Profile" />
      </Title>
      <Box>
        <dl>
          <dt><FormattedMessage id="Email" defaultMessage="Email" />:</dt>
          {emailValue}
        </dl>
      </Box>
      <Footer
        size="small"
        pad={{ vertical: 'small' }}
      />
    </Box>
  );
};

UserProfilePage.propTypes = {
  auth: React.PropTypes.object
};

UserProfilePage.defaultProps = {};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps
)(UserProfilePage);
