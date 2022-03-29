let EditButton = document.querySelector('.profile__edit');
let Popup = document.querySelector('.popup');
let PopupCross = document.querySelector('.popup__cross');
let PopupSubmit = document.querySelector('.popup__submit');
let ProfileName = document.querySelector('.profile__name');
let ProfileActivity = document.querySelector('.profile__activity');
let PopupName = document.querySelector('.popup__name');
let PopupActivity = document.querySelector('.popup__activity');

function togglePopup ()  {
  Popup.classList.toggle('popup__open');
  PopupName.value = ProfileName.textContent;
  PopupActivity.value = ProfileActivity.textContent;
}

EditButton.addEventListener('click', togglePopup);
PopupCross.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = PopupName.value;
  ProfileActivity.textContent = PopupActivity.value;
  togglePopup();
}

PopupSubmit.addEventListener('click', formSubmitHandler);


