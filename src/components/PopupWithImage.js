import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__card-image');
    this._popupTitle = this._popupElement.querySelector('.popup__caption');

  }

  open(item) {
    super.open();
   
    this._popupImage.src = item.link;
    this._popupTitle.alt = item.name;
    this._popupTitle.textContent = item.name;
  }
} 