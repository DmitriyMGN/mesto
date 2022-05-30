import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,submitAddCard) {
    super(popupSelector);
    this._submitAddCard = submitAddCard;
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    let inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.id] = input.value;
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

  close() {
    super.close();
    this._popupForm.reset();
  }
} 