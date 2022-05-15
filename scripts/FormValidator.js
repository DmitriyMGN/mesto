export class FormValidator {
  constructor(object, formElement) {
    this._object = object;
    this._formElement =  formElement;
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

  _hasInvalidInput (inputList) {
    return inputList.some(function (input) {
      return !input.validity.valid;
    });
  }

  _disableSubmitButton (buttonElement,inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
  }

  _toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
    if(this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement,inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled'); 
    }
  }

  _setEventListeners (object, formElement)  {
    const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>  {
        this._checkInputValidity(object, formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
      });
    });
  }

  enableValidation () {
      this._setEventListeners (this._object, this._formElement);
  }

  deleteErrors (object, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    });
   }

}