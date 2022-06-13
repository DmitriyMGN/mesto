import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,submitAddCard) {
    super(popupSelector);
    this._submitAddCard = submitAddCard;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));

  }

  _getInputValues() {
    let inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAddCard(this._getInputValues());
    }); 
  }

  deleteCard(api) {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      api
    }); 
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
} 