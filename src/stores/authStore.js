import { observable, action, flow } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';
import error from '../utils/error';

class AuthStore {
  
  // Login
  @observable loginLoading = false;
  @observable changePasswordError = undefined;
  @observable loginPageError = undefined;

  // Registration
  @observable registerPageError = undefined;
  @observable registrationLoading = false;

  // Reset Password
  @observable resetPasswordSuccess = false;

  // Change Password
  @observable changePasswordLoading = false;

  // Verify Email
  @observable verifyLoading = false;
  @observable verifyEmailError = undefined;
  @observable verifyEmailSuccess = false;

  @action clearAlerts() {
    this.loginPageError = undefined;
    this.changePasswordError = undefined;
    this.verifyEmailError = undefined;
    this.resetPasswordSuccess = false;
    this.verifyLoading = false;
    this.verifyEmailSuccess = false;
  }

  @action
  resetPassword = flow(function* ({email}) {
    this.loginLoading = true;
    this.clearAlerts();
    try {
      yield agent.Auth.resetPassword(email)
      this.resetPasswordSuccess = true 
    } catch (e) {
      this.loginPageError = error.multipleServerErrorMessage(e);
      throw e
    } finally {
      this.loginLoading = false
    }
  });

  @action 
  login = flow(function* ({email, password}) {
    this.loginLoading = true;
    this.clearAlerts();
    try {
      const { user } = yield agent.Auth.login(email, password);
      commonStore.setToken(user.token);
      yield userStore.pullUser();
    } catch (e) {
      this.loginPageError = error.multipleServerErrorMessage(e);
      throw e;
    } finally {
      this.loginLoading = false;
    }
  });

  @action
  changePassword = flow(function* ({password}, hash) {
    this.clearAlerts();
    this.changePasswordLoading = true;
    try {
      yield agent.Auth.changePassword(password, hash)
    } catch (e) {
      this.changePasswordError = error.multipleServerErrorMessage(e);
      throw e;
    } finally {
      this.changePasswordLoading = false;
    }
  });

  @action 
  verifyEmail = flow(function* (hash) {
    this.clearAlerts();
    this.verifyLoading = true;
    try {
      yield agent.Auth.verifyEmail(hash)
      this.verifyEmailSuccess = true
      yield userStore.pullUser()
    } catch (e) {
      this.verifyEmailError = error.multipleServerErrorMessage(e);
      throw e;
    } finally {
      this.verifyLoading = false;
    }
  });

  @action
  register = flow(function* (values) {
    this.registrationLoading = true;
    this.registerPageError = undefined;
    try {
      const { user } = yield agent.Auth.register(values)
      commonStore.setToken(user.token)
      yield userStore.pullUser()
    } catch (e) {
      this.registerPageError = error.multipleServerErrorMessage(e)
      throw e
    } finally {
      this.registrationLoading = false
    }
  });

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
