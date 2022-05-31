export default class FormValidator {
  constructor(object, formElement) {
    this._formElement =  formElement;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;

    this._inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
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

  disableSubmitButton (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
  }
  _toggleButtonState (buttonElement) {
    if(this._hasInvalidInput()) {
      this.disableSubmitButton(buttonElement,this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled'); 
    }
  }

  _setEventListeners ()  {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>  {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
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