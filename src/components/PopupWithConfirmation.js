import Popup from './Popup.js';

export default class PopupWithСonfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
   }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback();
  })
}



}