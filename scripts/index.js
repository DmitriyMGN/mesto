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
const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupForm = document.querySelector('.popup__form');
const popupCrossPlaceProfile = document.querySelector('.popup__cross');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');
const popupCardName = document.querySelector('.popup__input_place_card-name');
const popupCardLink = document.querySelector('.popup__input_place_card-link');

const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceCard = document.querySelector('.popup_place_card'); 
const popupCrossPlaceCard = popupPlaceCard.querySelector('.popup__cross');
const popupSubmitPlaceCard = popupPlaceCard.querySelector('.popup__submit');

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
  removeButton.addEventListener('click', handleRemoveElements);
 
  return newItem;
}

function openPopup(modalWindow) {
  modalWindow.classList.add('popup_open');
  }

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_open');
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
popupSubmitPlaceCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  const element = getElement({name: popupCardName.value, link: popupCardLink.value });
  elementsList.prepend(element);
  closePopup(popupPlaceCard);
  evt.preventDefault();
});



render();

