export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick({
        name: this._text,
        link: this._image
      });
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _handleCardRemove() {
    this._element.querySelector('.elements__basket').closest('.elements__item').remove();
  }
}
