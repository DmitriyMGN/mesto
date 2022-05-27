export default class FormValidator {
  constructor(object, formElement) {
    this._object = object;
    this._formElement =  formElement;
    this._inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
  }

  _showInputError (inputErrorClass, errorClass, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError (inputErrorClass, errorClass, formElement, inputElement)  {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (object, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    } else {
      this._hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some(function (input) {
      return !input.validity.valid;
    });
  }

  disableSubmitButton (buttonElement,inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
  }

  _toggleButtonState (buttonElement, inactiveButtonClass) {
    if(this._hasInvalidInput()) {
      this.disableSubmitButton(buttonElement,inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled'); 
    }
  }

  _setEventListeners (object, formElement)  {
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>  {
        this._checkInputValidity(object, formElement, inputElement);
        this._toggleButtonState(buttonElement, object.inactiveButtonClass);
      });
    });
  }

  enableValidation () {
      this._setEventListeners (this._object, this._formElement);
  }

  deleteErrors (object, formElement) {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    });
   }
}