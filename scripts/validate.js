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
    console.log('Не валидно');
    showInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
  } else {
    hideInputError(object.inputErrorClass, object.errorClass, formElement, inputElement);
    console.log('Валидно');
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(object, formElement, inputElement);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  console.log(object.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(object, formElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

// const showInputError = (form,input,inputError,spanError,errorMessage) => {
//   const errorForm = document.querySelector(`${form}`);
//   const inputElement = document.querySelector(`${input}`);
//   const errorElement = errorForm.querySelector('.popup__error');
//   inputElement.classList.add(`${inputError}`);
//   errorElement.classList.add(`${spanError}`);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (form, input, inputError,spanError) => {
//   const errorForm = document.querySelector(`${form}`);
//   const inputElement = document.querySelector(`${input}`);
//   const errorElement = errorForm.querySelector('.popup__error');
//   inputElement.classList.remove(`${inputError}`);
//   errorElement.classList.remove(`${spanError}`);
//   console.log(`${spanError}`)
//   errorElement.textContent = '';
// };

// const checkInputValidity = function (form,input,inputError,spanError) {
//   const validateInput = document.querySelector(`${input}`);
//   const errorMessage = validateInput.validationMessage;
//   if(!validateInput.validity.valid) {
//     console.log('Не валидно');
//     showInputError(form,input,inputError,spanError,errorMessage);
//   } else {
//     hideInputError(form,input,inputError,spanError);
//     console.log('Валидно');
//   }
// };

// const setEventListeners = (form, input) => {
//   const inputList = Array.from(document.querySelectorAll(`${input}`));
//   inputList.forEach((input1) => {
//     input1.addEventListener('input', function () {
//       checkInputValidity(form,input);
//       console.log(input);
//     });
//   });
// };

// const enableValidation = ({formSelector,inputSelector,inputErrorClass,errorClass}) => {
//   setEventListeners(formSelector,inputSelector);
//   checkInputValidity(formSelector,inputSelector,inputErrorClass,errorClass);

// }



