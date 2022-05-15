export class Card {
  constructor(item, templateElement, handleOpenCardImage) {
    this._name = item.name;
    this._link = item.link;
    this._templateElement = templateElement;
    this._handleOpenCardImage = handleOpenCardImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateElement)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.elements__image').src= this._link;
    this._element.querySelector('.elements__image').alt= this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
   
    return this._element;
  }
  
  _setEventListeners () {
    const removeButton =  this._element.querySelector('.elements__remove');
    const likeButton = this._element.querySelector('.elements__like');
    const elementsImage = this._element.querySelector('.elements__image');

    removeButton.addEventListener('click', () => {this._element.remove();});
    likeButton.addEventListener('click', () => {this._handleLikeElements();});
    elementsImage.addEventListener('click', this._handleOpenCardImage);
  }

  _handleLikeElements() {
    const likeButtonActive = this._element.querySelector('.elements__like');
    likeButtonActive.classList.toggle('elements__like_active');
  }
 
}