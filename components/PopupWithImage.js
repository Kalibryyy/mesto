import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
  
    open(cardData) {
      super.open();
  
      // вставляем в попап картинку и атрибут src изображения
      openImage.src = cardData.link;
      openImage.alt = cardData.name;
      pictureText.textContent = cardData.name;
  
      this._popup.querySelector('.modal__picture-overlay').addEventListener('click', () => this._handleOverlayClose());
    }
  
    close() {
      super.close();
  
      this._popup.querySelector('.modal__picture-overlay').removeEventListener('click', () => this._handleOverlayClose());
    }
  }