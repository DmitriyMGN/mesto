let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCross = document.querySelector('.popup__cross');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let popupName = document.querySelector('.popup__input_place_name');
let popupActivity = document.querySelector('.popup__input_place_activity');

function togglePopup ()  {
  popup.classList.toggle('popup_open');
  if (popup.classList.contains('popup_open')) {
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
  }
}

editButton.addEventListener('click', togglePopup);
popupCross.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  togglePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);