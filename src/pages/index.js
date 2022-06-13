import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

const initialCards = [{
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
const popupPlaceAvatar = document.querySelector('.popup_place_avatar');
const popupFormPlaceCard = popupPlaceCard.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');


const cardFormValidator = new FormValidator(object, popupFormPlaceCard);
const profileFormValidator = new FormValidator(object, popupPlaceProfile);
const avatarFormValidator = new FormValidator(object, popupPlaceAvatar);
const popupWithImage = new PopupWithImage('.popup_place_card-image');
const userInfo = new UserInfo('.profile__name', '.profile__activity');

const api = new Api('https://nomoreparties.co/v1/cohort-43');

const cardList = new Section(
  function renderer(item) {
    const card = createCard(item);
    cardList.addItem(card);
  },
  '.elements__list');

const popupWithCardForm = new PopupWithForm('.popup_place_card', (item) => {
  api.setNewCard(item)
    .then(res => {
      if (res.ok) {
        return cardList.addItem(createCard(item));
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(err => {
      console.log(err)
    })
  popupWithCardForm.close();
});

const popupWithProfileForm = new PopupWithForm('.popup_place_profile', (item) => {
  api.setUserInfo(item)
    .then(res => {
      if (res.ok) {
        return userInfo.setUserInfo(item);
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(err => {
      console.log(err)
    })
  popupWithProfileForm.close();
});

const popupDeleteCard = new PopupWithForm('.popup_place_card-delete');


function createCard(item) {
  const card = new Card(item, '.template', () => popupWithImage.open(item), '03cdb19cf25840cb7b559c84');
  const cardElement = card.generateCard();
  return cardElement;
}

editButton.addEventListener('click', function () {
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupActivity.value = data.activity;

  profileFormValidator.deleteErrors();
  popupWithProfileForm.open();
});

profileAddButton.addEventListener('click', function () {
  cardFormValidator.deleteErrors();
  cardFormValidator.disableSubmitButton();
  popupWithCardForm.open();
});


api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo({
      person: data.name,
      job: data.about
    });
    userInfo.setUserAvatar(data.avatar)
  })
  .catch(err => {
    console.log(err)
  })

api.getInitialCards()
  .then(data => {
    console.log(data)
    cardList.renderItems(data);
  })
  .catch(err => {
    console.log(err)
  })


cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
popupWithImage.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupDeleteCard.setEventListeners();