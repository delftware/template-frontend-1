import { observable, action, flow } from 'mobx';
import agent from '../agent';
import error from '../utils/error';

class UserStore {

  @observable currentUser;
  @observable accountUser;
  @observable userId;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable updateUserSuccess;
  @observable uploadPhotoError;
  @observable image;
  @observable imageUrl;
  @observable deleteImage = false;
  @observable sendingVerificationEmail = false;
  @observable isFetchingUser = false;
  @observable fetchUserError;
 
  @action
  pullUser = flow(function* () {
    this.loadingUser = true;
    try {
      const { user } = yield agent.Auth.current();      
      this.setCurrentUser(user)
    } catch (e) {
      console.error(e);
      this.fetchUserError = true;
    } finally {
      this.loadingUser = false;
    }
  });


  @action 
  resendVerification = flow(function* () {
    this.clearAlerts();
    this.sendingVerificationEmail = true;
    yield agent.Auth.resendVerification()
    this.sendingVerificationEmail = false;
  });

  @action clearAlerts() {
    this.updatingUserErrors = undefined;
    this.updateUserSuccess = false;
    this.updatingUser = false;
    this.sendingVerificationEmail = false;
  }

  @action
  updateUser = flow(function* (newUser, isAdmin) {    
    this.clearAlerts();
    this.updatingUser = true;
    try {
      const { user } = yield agent.Auth.save(newUser, this.deleteImage, this.image);
      this.updateUserSuccess = true;
      if (isAdmin) {
        this.setAccountUser(user);
      } else {        
        this.setCurrentUser(user);
      }
    } catch (e) {
      this.updatingUserErrors = error.multipleServerErrorMessage(e); 
      throw e;       
    } finally {
      this.updatingUser = false;
    }
  });

  @action forgetUser() {
    this.setCurrentUser(undefined);
  }

  @action setProfileImage(imageFile) {
    this.imageUrl = imageFile.preview;
    this.image = imageFile;
  }

  @action deleteProfileImage() {    
    this.image = undefined;
    this.imageUrl = undefined;
    this.deleteImage = true;
  }

  @action setCurrentUser(updatedUser) {
    this.currentUser = updatedUser;
    this.setAccountUser(updatedUser);
  }

  @action setAccountUser(updatedUser) {
    this.accountUser = updatedUser;
    if (!updatedUser) {
      this.imageUrl = undefined;
    } else {
      this.imageUrl = updatedUser.image;
    }
  }
}

export default new UserStore();
