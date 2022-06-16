import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,submitAddCard) {
    super(popupSelector);
    this._submitAddCard = submitAddCard;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._buttonElement = this._popupForm.querySelector('.popup__button');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
  }

  renderLoading(isLoading, intialMessage, updateMessage) {
    if(isLoading) {
      this._buttonElement.textContent = updateMessage;
    } else {
      this._buttonElement.textContent = intialMessage;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault()
      this._submitAddCard(this._getInputValues());
    }); 
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
} 