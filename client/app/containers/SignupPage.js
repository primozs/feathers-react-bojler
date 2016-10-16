import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Form from 'grommet/components/Form';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Logo from '../components/Logo';
import * as authActionCreators from '../../app/actions/authActions';

const CLASS_ROOT = 'login-form';

class SignupPage extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.email.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    this.props.authActions.signup({
      email,
      password
    }, this.context.feathers);
  }

  render() {
    const username = (
      <FormattedMessage id="Email" defaultMessage="Email" />
    );
    const password = (
      <FormattedMessage id="Password" defaultMessage="Password" />
    );
    const signup = (
      <FormattedMessage id="Signup" defaultMessage="Signup" />
    );
    const appTitle = (
      <FormattedMessage id="appTitle" defaultMessage="React Feathers" />
    );
    const signupTitle = (
      <FormattedMessage
        id="signupTitle"
        defaultMessage="Signup for user account"
      />
    );

    const classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--align-center`);

    const logo = (
      <div className={`${CLASS_ROOT}__logo`}><Logo /></div>
    );

    const title = (
      <h1 className={`${CLASS_ROOT}__title`}>
        <strong>{appTitle}</strong>
      </h1>
    );

    const secondaryText = (
      <p className={`${CLASS_ROOT}__secondary-text secondary`}>
        {signupTitle}
      </p>
    );

    const errors = this.props.auth.signupErrors.map((error, index) => {
      let errorComponent;
      if (error) {
        errorComponent = (
          <div key={index} className={`${CLASS_ROOT}__error error`}>
            <FormattedMessage
              id={error.message}
              defaultMessage={error.message}
            />
          </div>
        );
      }
      return errorComponent;
    });

    return (
      <Box align="center" full="vertical">
        <Header size="medium" />
        <Form className={classes.join(' ')} onSubmit={this.onSubmit}>
          <div className={`${CLASS_ROOT}__header`}>
            {logo}
            {title}
            {secondaryText}
          </div>
          <fieldset>
            <FormField htmlFor="email" label={username}>
              <input
                id="email"
                ref={(email) => {
                  this.email = email;
                }}
                type="email"
                defaultValue={''}
              />
            </FormField>
            <FormField htmlFor="password" label={password}>
              <input
                id="password"
                ref={(passwd) => {
                  this.password = passwd;
                }}
                type="password"
              />
            </FormField>
            {errors}
            <Footer
              align={this.props.align}
              size="small"
              direction="column"
              pad={{ vertical: 'medium', between: 'medium' }}
            >
              <Button
                id={`${CLASS_ROOT}__submit`}
                primary={true}
                strong={true}
                className={`${CLASS_ROOT}__submit`}
                type="submit"
                label={signup}
                onClick={this.onSubmit}
              />
            </Footer>
          </fieldset>
        </Form>
      </Box>
    );
  }
}

SignupPage.propTypes = {
  auth: PropTypes.object,
  authActions: PropTypes.object,
  align: PropTypes.string
};

SignupPage.contextTypes = {
  feathers: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
