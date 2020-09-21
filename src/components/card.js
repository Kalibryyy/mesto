export default class Card {
  constructor(data, cardSelector, currentUserID, {
    handleCardClick,
    handleLikePut,
    handleLikeRemove,
    handleCardDelete
  }) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwner = data.owner._id;
    this._cardSelector = cardSelector;
    this._currentUserID = currentUserID;
    this._handleCardClick = handleCardClick;
    this._handleLikePut = handleLikePut;
    this._handleLikeRemove = handleLikeRemove;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    if (`${this._currentUserID}` === this._cardOwner) {
      this._element.querySelector('.elements__basket').classList.add('elements__basket_visible');
    }
    this._setEventListeners();
    const elementsImage = this._element.querySelector('.elements__image');
    elementsImage.src = this._image;
    elementsImage.alt = this._text;
    this._element.querySelector('.elements__text').textContent = this._text;
    
    this._renderLikesNumber();

    return this._element;
  }

  _renderLikesNumber() {
    const likesNumber = this._element.querySelector('.elements__likes-number');
    likesNumber.textContent = this._likes.length;
  }

  updateLikes(newCardData) {
    this._likes = newCardData.likes;

    this._renderLikesNumber();

    const isLiked = this._likes.some((person) => {
      return person._id === `${this._currentUserID}`;
    });
    this._renderLikeButton(isLiked);
  }

  _renderLikeButton(isLiked) {
    if (isLiked) {
      this._element.querySelector('.elements__like').classList.add('elements__like_active'); 
    } else {
      this._element.querySelector('.elements__like').classList.remove('elements__like_active');
    }
  }

  handleCardRemove() {
    this._element.remove();
  }

  _putOrRemoveLike(data) {
    if (this._element.querySelector('.elements__like').classList.contains('elements__like_active')) {
      this._handleLikeRemove(data);
    } else {
      this._handleLikePut(data);
    }
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._putOrRemoveLike({
        id: this._id,
      });
    });
    this._element.querySelector('.elements__basket').addEventListener('click', () => {
      this._handleCardDelete({
        id: this._id,
      });
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._text,
        link: this._image
      });
    });
  }
}
