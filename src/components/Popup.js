export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('modal_opened');
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.querySelector('.modal__overlay').addEventListener('click', () => this._handleOverlayClose());
    }
  
    close() {
      this._popup.classList.remove('modal_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._popup.querySelector('.modal__overlay').removeEventListener('click', () => this._handleOverlayClose());
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

    changeSaveCaption(isLoading) {
      if (isLoading) {
        this._popup.querySelector('.modal__btn').textContent = 'Сохранение...';
      } else {
        this._popup.querySelector('.modal__btn').textContent = 'Сохранить';
      }
    }
  }