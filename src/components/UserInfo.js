export default class UserInfo {
  constructor(profileNameSelector, profileActivitySelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileActivityElement = document.querySelector(profileActivitySelector);
    this._avatarElement = document.querySelector('.profile__avatar')
  }

  getUserInfo() {
    const profileData = {
      name: this._profileNameElement.textContent,
      activity: this._profileActivityElement.textContent
    };
    return profileData;
  }

  setUserInfo(data) {
      this._profileNameElement.textContent = data.person;
      this._profileActivityElement.textContent = data.job;
  }

  setUserAvatar(url) {
    this._avatarElement.style.backgroundImage = `url(${url})`;
  }
}