import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const object = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit');
const popupCrossPlaceProfile = document.querySelector('.popup__cross');
const profileAddButton = document.querySelector('.profile__add-button');

const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupPlaceCard = document.querySelector('.popup_place_card'); 
const popupPlaceCardImage = document.querySelector('.popup_place_card-image');
const popupForm = document.querySelector('.popup__form');
const popupFormPlaceCard = popupPlaceCard.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');
const popupCardName = document.querySelector('.popup__input_place_card-name');
const popupCardLink = document.querySelector('.popup__input_place_card-link');

const popupCrossPlaceCard = popupPlaceCard.querySelector('.popup__cross');
const popupCrossPlaceCardImage = popupPlaceCardImage.querySelector('.popup__cross');
const elementsList = document.querySelector('.elements__list');

function openPopup(modalWindow) {
  modalWindow.classList.add('popup_open');
  document.addEventListener('keydown', onEscClose);
  modalWindow.addEventListener('click', onOverlayClickClose);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_open');
  document.removeEventListener('keydown', onEscClose);
  modalWindow.removeEventListener('click', onOverlayClickClose);
}

function onEscClose(evt) {
  const openPopupWin = document.querySelector('.popup_open');
  if (evt.key === 'Escape' && openPopupWin !== null) {
    closePopup(openPopupWin);
  }
}

function onOverlayClickClose (evt) {
  const openPopupWin = document.querySelector('.popup_open');
  if (evt.target.classList.contains('popup')) {
    closePopup(openPopupWin);
  }
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopup(popupPlaceProfile);
}

function handleOpenCardImage(evt) {
  openPopup(popupPlaceCardImage);
  const element = evt.target.closest('.elements__item');
  const elementsImage = element.querySelector('.elements__image');
  const popupCardImage = popupPlaceCardImage.querySelector('.popup__card-image');
  const elementsTitle = element.querySelector('.elements__title');
  const popupCaption = popupPlaceCardImage.querySelector('.popup__caption');

  popupCardImage.src = elementsImage.src;
  popupCardImage.alt = elementsImage.alt;
  popupCaption.textContent = elementsTitle.textContent;
}

editButton.addEventListener('click', function() {
  if (!popupPlaceProfile.classList.contains('popup_open')) {
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
  }
  const formValidator = new FormValidator(object, popupPlaceProfile);
  formValidator.enableValidation();
  formValidator.deleteErrors(object, popupPlaceProfile);
  openPopup(popupPlaceProfile);
});

popupCrossPlaceProfile.addEventListener('click', () => closePopup(popupPlaceProfile));
popupForm.addEventListener('submit', profileFormSubmitHandler);
profileAddButton.addEventListener('click', function() {
  popupCardName.value ='';
  popupCardLink.value ='';
  const formValidator = new FormValidator(object, popupPlaceCard);
  formValidator.enableValidation();
  formValidator.deleteErrors(object, popupPlaceCard);
  openPopup(popupPlaceCard);
});
popupCrossPlaceCard.addEventListener('click', () => closePopup(popupPlaceCard));
popupCrossPlaceCardImage.addEventListener('click', () => closePopup(popupPlaceCardImage));
popupFormPlaceCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const element = new Card({name: popupCardName.value, link: popupCardLink.value},'.template', handleOpenCardImage);
  elementsList.prepend(element.generateCard());
  closePopup(popupPlaceCard);
});

initialCards.forEach((item) => {
  const card = new Card(item, '.template', handleOpenCardImage);
  const cardElement = card.generateCard();

  elementsList.append(cardElement);
});