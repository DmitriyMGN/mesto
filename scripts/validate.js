const showInputError = (form,input,inputError,spanError,errorMessage) => {
  const errorForm = document.querySelector(`${form}`);
  const inputElement = document.querySelector(`${input}`);
  const errorElement = errorForm.querySelector('.popup__error');
  console.log(errorElement);
  inputElement.classList.add(`${inputError}`);
  errorElement.classList.add(`${spanError}`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputError, spanError) => {
  const errorFormElement = document.querySelector(`${formElement}`);
  const errorElement = errorFormElement.querySelector(`${inputElement}-error`);
  inputElement.classList.add(`${inputError}`);
  errorElement.classList.add(`${spanError}`);
  errorElement.textContent = '';
};

const checkInputValidity = function (form,input,inputError,spanError) {
  const validateInput = document.querySelector(`${input}`);
  const errorMessage = validateInput.validationMessage;
  console.log(validateInput);
  if(!validateInput.validity.valid) {
    console.log('Не валидно');
    showInputError(form,input,inputError,spanError,errorMessage);
  } else {
    hideInputError(form,input,inputError,spanError);
    console.log('Валидно');
  }
};

const enableValidation = ({formSelector,inputSelector,inputErrorClass,errorClass}) => {
  checkInputValidity(formSelector,inputSelector,inputErrorClass,errorClass);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

