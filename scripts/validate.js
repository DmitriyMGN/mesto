<<<<<<< HEAD

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
  return console.log(formElement);
};

const enableValidation = function ({formElement, inputElement, inputErrorClass, errorClass, inputSelector}) {
  showInputError(formElement, inputElement, inputErrorClass, errorClass, inputSelector.validationMessage);
};

enableValidation({
=======
const object = {
>>>>>>> develop
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
<<<<<<< HEAD
}); 
=======
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

const toggleButtonState = function (inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
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
  inputList.forEach((inputElement) => {
    hideInputError(object.inputErrorClass, object.errorClass, modalWindow, inputElement);
  });
 };

 enableValidation(object);



>>>>>>> develop
