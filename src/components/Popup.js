export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
	  if (evt.key === 'Escape') {
		this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleClickClose(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__cross')) {
        this.close();
      }
  }

  setEventListeners() {
    document.addEventListener('click', (evt) => {this._handleClickClose(evt);});
  }    
}
