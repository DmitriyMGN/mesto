export default class Card {
  constructor(item, templateElement, handleOpenCardImage, myId, handleRemoveCardClick, handleLikeClick) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.owner._id;
    this._myId = myId;
    this._cardId = item._id;
    this._templateElement = templateElement;
    this._handleOpenCardImage = handleOpenCardImage; 
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._handleLikeClick = handleLikeClick;
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
    this._likeButton = this._element.querySelector('.elements__like-count');
    this._setEventListeners();

    if (this._id !== this._myId){
      this._element.querySelector('.elements__remove').remove()
    }
    
    this._element.querySelector('.elements__image').src= this._link;
    this._element.querySelector('.elements__image').alt= this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    this._likeButton.textContent = this._likes.length
    
    return this._element;
  }
  
  _setEventListeners () {
    const removeButton =  this._element.querySelector('.elements__remove');
    this.likeButton = this._element.querySelector('.elements__like');
    const elementsImage = this._element.querySelector('.elements__image');

    removeButton.addEventListener('click', () => {this._handleRemoveCardClick(this)});
    this.likeButton.addEventListener('click', () => {this._handleLikeClick(this)});
    elementsImage.addEventListener('click', this._handleOpenCardImage);
  }

  getCardId() {
    return this._cardId
  }

  removeCard() {
    this._element.remove();
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeButton.textContent = this._likes.length;
   }

  isLiked() {
   return this._likes.some(item => item._id == this._myId);
  }

  addLikeElements() {
    this.likeButton.classList.add('elements__like_active');
  }

  removeLikeElements() {
    this.likeButton.classList.remove('elements__like_active');
  }
}