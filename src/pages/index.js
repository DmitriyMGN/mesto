import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupPlaceCard = document.querySelector('.popup_place_card'); 
const popupFormPlaceCard = popupPlaceCard.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');
const popupCardButton = popupPlaceCard.querySelector('.popup__button');

const cardFormValidator = new FormValidator(object, popupFormPlaceCard);
const profileFormValidator = new FormValidator(object, popupPlaceProfile);
const popupProfile = new Popup('.popup_place_profile');
const popupAddCard = new Popup('.popup_place_card');
const popupWithImage = new PopupWithImage('.popup_place_card-image');
const userInfo = new UserInfo('.profile__name', '.profile__activity');

const cardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
   }}, 
 '.elements__list');

const popupWithCardForm = new PopupWithForm('.popup_place_card', (item) => {
  cardList.addItem(createCard({name: item.place, link: item.link}));
  popupWithCardForm.close();
});

const popupWithProfileForm = new PopupWithForm('.popup_place_profile', (item) => {
  userInfo.setUserInfo(item);
  popupWithProfileForm.close();
});

function createCard(item) {
  const card = new Card(item, '.template', () => popupWithImage.open({name: item.name, link: item.link}));
  const cardElement = card.generateCard(); 
  return cardElement;
}

editButton.addEventListener('click', function() {
    let data = userInfo.getUserInfo();
    popupName.value = data.name;
    popupActivity.value = data.activity;

    profileFormValidator.deleteErrors(object, popupPlaceProfile);
    popupProfile.open();
});

profileAddButton.addEventListener('click', function() {
  cardFormValidator.deleteErrors(object, popupPlaceCard);
  cardFormValidator.disableSubmitButton(popupCardButton, object.inactiveButtonClass);
  popupAddCard.open();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
cardList.renderItems();