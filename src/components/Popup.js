export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  
  open() {
    this._popupElement.classList.add('popup_open');
    this.setEventListeners();
  }
  
  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt);});
}
  
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__cross')) {
        this.close();
      }
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt);});
    document.addEventListener('click', (evt) => {this._handleClickClose(evt);});
  }    
}