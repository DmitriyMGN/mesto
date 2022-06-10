export default class UserInfo {
  constructor(profileNameSelector, profileActivitySelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileActivityElement = document.querySelector(profileActivitySelector);
  }

  getUserInfo() {
    const profileData = {
      name: this._profileNameElement.textContent,
      activity: this._profileActivityElement.textContent
    };
    return profileData;
  }

  setUserInfo(item) {
      this._profileNameElement.textContent = item.person,
      this._profileActivityElement.textContent = item.job;
  }
}