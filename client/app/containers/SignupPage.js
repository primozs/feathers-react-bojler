import React, { PropTypes } from 'react';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Form from 'grommet/components/Form';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Logo from '../components/Logo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../../app/actions/authActions';

const CLASS_ROOT = 'login-form';

class SignupPage extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.authActions.signup({
      email,
      password
    }, this.context.feathers);
  }

  componentDidMount() {
    this.refs.email.focus();
  }

  render() {
    let username = <FormattedMessage id="Email" defaultMessage="Email" />;
    let password = <FormattedMessage id="Password" defaultMessage="Password" />;
    let signup = <FormattedMessage id="Signup" defaultMessage="Signup" />;
    let appTitle = <FormattedMessage id="appTitle" defaultMessage="React Feathers" />;
    let signupTitle = <FormattedMessage id="signupTitle" defaultMessage="Signup for user account" />;

    let classes = [CLASS_ROOT];
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

    let errors = this.props.auth.signupErrors.map(function (error, index) {
      let errorComponent = undefined;
      if (error) {
        errorComponent = (
          <div key={index} className={`${CLASS_ROOT}__error error`}>
            <FormattedMessage id={error.message} defaultMessage={error.message} />
          </div>
        );
      }
      return errorComponent;
    });

    return (
      <Box align="center" full="vertical">
        <Header size="medium"/>
        <Form className={classes.join(' ')} onSubmit={this.onSubmit}>
          <div className={`${CLASS_ROOT}__header`}>
            {logo}
            {title}
            {secondaryText}
          </div>
          <fieldset>
            <FormField htmlFor="email" label={username}>
              <input id="email" ref="email" type="email" defaultValue={""} />
            </FormField>
            <FormField htmlFor="password" label={password}>
              <input id="password" ref="password" type="password" />
            </FormField>
            {errors}
            <Footer
              align={this.props.align}
              size="small"
              direction="column"
              pad={{vertical: 'medium', between: 'medium'}}>

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
  auth: React.PropTypes.object,
  authActions: React.PropTypes.object
};

SignupPage.contextTypes = {
  feathers: React.PropTypes.object
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
