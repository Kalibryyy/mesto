import Popup from './Popup.js';
import { openImage, pictureText } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._color = 'rgba(0, 0, 0, .9)'; 
      this._overlay = this._popup.querySelector('.modal__overlay');
    }
  
    open(cardData) {
      super.open();
  
      // вставляем в попап картинку и атрибут src изображения
      openImage.src = cardData.link;
      openImage.alt = cardData.name;
      pictureText.textContent = cardData.name;
      this._overlay.style.background = this._color;
    }
  
    close() {
      super.close();
    }
  }