import Popup from './Popup.js';

export default class PopupAvatarUpdate extends Popup {
    constructor(popupSelector, {
        handleFormSubmit
      }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupContainer = this._popup.querySelector('.modal__container');
        this._modalInput = this._popupContainer.querySelector('.modal__input');
    }

    setEventListeners() {
      super.setEventListeners();
      // добавляем обработчик сабмита формы
      this._popupContainer.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        this._modalInputValue = this._modalInput.value;
        this._handleFormSubmit(this._modalInputValue); 

        this.close();
      });
    }

    changeSaveCaption(isLoading) {
      super.changeSaveCaption(isLoading);
    }
  
    open() {
      super.open();
    }
  
    close() {
      super.close();
    }
}