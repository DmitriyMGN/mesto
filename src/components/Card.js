export default class Card {
  constructor(item, templateElement, handleOpenCardImage, authorId) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._id = item.owner._id;
    this._authorId = authorId;
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

    if (this._id !== this._authorId){
      this._element.querySelector('.elements__remove').remove()
    }
    
    this._element.querySelector('.elements__image').src= this._link;
    this._element.querySelector('.elements__image').alt= this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes;
    
    return this._element;
  }
  
  _setEventListeners () {
    const removeButton =  this._element.querySelector('.elements__remove');
    const likeButton = this._element.querySelector('.elements__like');
    const elementsImage = this._element.querySelector('.elements__image');

    removeButton.addEventListener('click', () => {
      document.querySelector('.popup_place_card-delete').classList.add('popup_open')
    });
    likeButton.addEventListener('click', () => {this._handleLikeElements();});
    elementsImage.addEventListener('click', this._handleOpenCardImage);
  }

  
  _handleLikeElements() {
    const likeButtonActive = this._element.querySelector('.elements__like');
    likeButtonActive.classList.toggle('elements__like_active');
  }
}