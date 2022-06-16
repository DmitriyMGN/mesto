import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

const object = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
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

const popupDeleteCard = new PopupWithConfirmation('.popup_place_card-delete')

const cardList = new Section(
  function renderer(item) {
    const card = createCard(item);
    cardList.addItem(card);
  },
  '.elements__list');

  function createCard(item) {
    const card = new Card(
      item, 
      '.template', 
      () => popupWithImage.open(item), 
      '03cdb19cf25840cb7b559c84',
      handleRemoveCardClick,
      handleLikeClick
  );
    
    const cardElement = card.generateCard();
    if(card.isLiked()){
      card.addLikeElements()
    }
    return cardElement;
  }

  function handleRemoveCardClick (card) {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitAction(() => {
        api.deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
            popupDeleteCard.close();
          })
        .catch((err) => console.log(err))
      })
    }

  function handleLikeClick (card) {
    if(!card.isLiked()) {
      api.likeCard(card.getCardId())
        .then((data) => {
          card.addLikeElements()
          card.updateLikes(data.likes)
        })
        .catch((err => console.log(err)))
    } else {
      api.removeLike(card.getCardId())
        .then((data) => {
          card.removeLikeElements()
          card.updateLikes(data.likes)
        })
        .catch((err => console.log(err)))
    }
   
  }

const popupWithCardForm = new PopupWithForm('.popup_place_card', (item) => {
  popupWithCardForm.renderLoading(true, 'Создать', 'Cохранение...')
  api.setNewCard(item)
    .then(data => {
      return cardList.addItem(createCard(data));
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithCardForm.renderLoading(false, 'Создать', 'Cохранение...')
    })
  popupWithCardForm.close();
});

const popupWithProfileForm = new PopupWithForm('.popup_place_profile', (item) => {
  popupWithProfileForm.renderLoading(true, 'Сохранить', 'Cохранение...')
  api.setUserInfo(item)
    .then(() => {
        return userInfo.setUserInfo(item);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithProfileForm.renderLoading(false, 'Сохранить', 'Cохранение...')})
    
  popupWithProfileForm.close();
});

const popupWithAvatar = new PopupWithForm('.popup_place_avatar', (item) => {
  popupWithAvatar.renderLoading(true, 'Сохранить', 'Cохранение...')
  api.updateAvatar(item.avatar)
    .then(data => {
      return userInfo.setUserAvatar(data.avatar)
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAvatar.renderLoading(false, 'Сохранить', 'Cохранение...')})
    popupWithAvatar.close()
})

profileAvatar.addEventListener('click', function () {
  popupWithAvatar.open()
  }
)

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
popupWithAvatar.setEventListeners();