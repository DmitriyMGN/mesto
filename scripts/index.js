const editButton = document.querySelector('.profile__edit');
const popupPlaceProfile = document.querySelector('.popup_place_profile');
const popupForm = document.querySelector('.popup__form');
const popupCrossPlaceProfile = document.querySelector('.popup__cross');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const popupName = document.querySelector('.popup__input_place_name');
const popupActivity = document.querySelector('.popup__input_place_activity');

const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceCard = document.querySelector('.popup_place_card'); 
const popupCrossPlaceCard = popupPlaceCard.querySelector('.popup__cross'); 


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

editButton.addEventListener('click', function() {
  popupPlaceProfile.classList.add('popup_open');
  if (popupPlaceProfile.classList.contains('popup_open')) {
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
}});

popupCrossPlaceProfile.addEventListener('click', () => closePopup(popupPlaceProfile));
profileAddButton.addEventListener('click', () => openPopup(popupPlaceCard));
popupCrossPlaceCard.addEventListener('click', () => closePopup(popupPlaceCard));

popupForm.addEventListener('submit', formSubmitHandler);