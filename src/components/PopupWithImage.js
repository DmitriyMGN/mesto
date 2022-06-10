import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    super.open();
    const popupImage = this._popupElement.querySelector('.popup__card-image');
    const popupTitle = this._popupElement.querySelector('.popup__caption');
 
    popupImage.src = item.link;
    popupTitle.alt = item.name;
    popupTitle.textContent = item.name;
  }
} 