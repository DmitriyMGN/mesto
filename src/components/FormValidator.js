export default class FormValidator {
  constructor(object, formElement) {
    this._formElement =  formElement;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError (inputElement)  {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some(function (input) {
      return !input.validity.valid;
    });
  }

  disableSubmitButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled','');
  }
  
  _toggleButtonState () {
    if(this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled'); 
    }
  }

  _setEventListeners ()  {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>  {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation () {
      this._setEventListeners ();
  }

  deleteErrors () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
   }
}