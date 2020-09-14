export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('modal_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('modal_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    //содержит логику закрытия попапа клавишей Esc
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    _handleOverlayClose() {
      this.close();
    }
  
    //добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
      this._popup.querySelector('.modal__close').addEventListener('click', () =>
        this.close());
    }
  }