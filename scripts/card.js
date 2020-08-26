import {
  openImage,
  pictureText,
  modalPicture,
  handleEscape
} from './constants.js';

export class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').src = this._image;
    this._element.querySelector('.elements__text').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.elements__basket').addEventListener('click', () => {
      this._handleCardRemove();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      openImage.src = this._image;
      openImage.alt = this._text;
      pictureText.textContent = this._text;
      modalPicture.classList.add('modal_opened');
      document.addEventListener('keydown', handleEscape);
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _handleCardRemove() {
    this._element.querySelector('.elements__basket').closest('.elements__item').remove();
  }
}
