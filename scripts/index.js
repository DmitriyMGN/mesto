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

const editButton = document.querySelector('.profile__edit');
const popupCrossPlaceProfile = document.querySelector('.popup__cross');
const profileAddButton = document.querySelector('.profile__add-button');

const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupPlaceCard = document.querySelector('.popup_place_card'); 
const popupPlaceCardImage = document.querySelector('.popup_place_card-image');
const elementsImage = document.querySelector('.elements__image');
const popupForm = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');
const popupCardName = document.querySelector('.popup__input_place_card-name');
const popupCardLink = document.querySelector('.popup__input_place_card-link');

const popupCrossPlaceCard = popupPlaceCard.querySelector('.popup__cross');
const popupCrossPlaceCardImage = popupPlaceCardImage.querySelector('.popup__cross');
const popupSubmitPlaceCard = popupPlaceCard.querySelector('.popup__button');
const elementsList = document.querySelector('.elements__list');
const template = document.querySelector('.template');

function render() {
  const html = initialCards.map(getElement);
  elementsList.prepend(...html);
} 

function getElement(item) {
  const newItem = template.content.cloneNode(true);
  const elementsTitle = newItem.querySelector('.elements__title');
  const elementsImage = newItem.querySelector('.elements__image');
  elementsTitle.textContent = item.name; 
  elementsImage.src = item.link;
  elementsImage.alt = item.name;

  const removeButton = newItem.querySelector('.elements__remove');
  const likeButton = newItem.querySelector('.elements__like');

  removeButton.addEventListener('click', handleRemoveElements);
  likeButton.addEventListener('click', handleLikeElements);
  elementsImage.addEventListener('click', handleOpenCardImage);

  return newItem;
}

function openPopup(modalWindow) {
  modalWindow.classList.add('popup_open');
  document.addEventListener('keydown', onEscClose);
  modalWindow.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(modalWindow);
    }
  });
  deleteErrors(object, modalWindow);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_open');
  modalWindow.removeEventListener('keydown', onEscClose);
  modalWindow.removeEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(modalWindow);
    }
  });
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopup(popupPlaceProfile);
}

function handleRemoveElements(evt) {
  const element = evt.target.closest('.elements__item');
  element.remove();
}

function handleLikeElements(evt) {
  const element = evt.target.closest('.elements__item');
  const likeButtonActive = element.querySelector('.elements__like');
  likeButtonActive.classList.toggle('elements__like_active');
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

function onEscClose(evt) {
  const openPopupWin = document.querySelector('.popup_open');
  if (evt.key === 'Escape' && openPopupWin !== null) {
    closePopup(openPopupWin);
  }
}

editButton.addEventListener('click', function() {
  if (!popupPlaceProfile.classList.contains('popup_open')) {
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
  }
  openPopup(popupPlaceProfile);
});
popupCrossPlaceProfile.addEventListener('click', () => closePopup(popupPlaceProfile));
popupForm.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', function() {
  popupCardName.value ='';
  popupCardLink.value ='';
  openPopup(popupPlaceCard);
});
popupCrossPlaceCard.addEventListener('click', () => closePopup(popupPlaceCard));
popupCrossPlaceCardImage.addEventListener('click', () => closePopup(popupPlaceCardImage));
popupSubmitPlaceCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  const element = getElement({name: popupCardName.value, link: popupCardLink.value });
  elementsList.prepend(element);
  closePopup(popupPlaceCard);
  evt.preventDefault();
});

render();

