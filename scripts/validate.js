const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (inputErrorClass, errorClass, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputErrorClass, errorClass, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = function (object, formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
  } else {
    hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputList) {
    return !inputList.validity.valid;
  });
};

const disableSubmitButton = function (buttonElement,inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled','');
};

const toggleButtonState = function (inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement,inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled'); 
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(object, formElement, inputElement);
      toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(object, formElement);
  });
};

const deleteErrors = function (object, modalWindow) {
  const inputList = Array.from(modalWindow.querySelectorAll(object.inputSelector));
  const formElement = modalWindow.querySelector(object.formSelector);
  inputList.forEach((inputElement) => {
    hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
  });
 };

enableValidation(object);