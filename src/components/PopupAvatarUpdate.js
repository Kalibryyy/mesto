import Popup from './Popup.js';

export default class PopupAvatarUpdate extends Popup {
    constructor(popupSelector, {
        handleFormSubmit
      }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
      super.setEventListeners();
      // добавляем обработчик сабмита формы
      this._popupContainer.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        console.log('вызван сабмит');
        
        this._handleFormSubmit();

        this.close();
      });
    }
  
    open() {
      super.open();
    }
  
    close() {
      super.close();
    }
}