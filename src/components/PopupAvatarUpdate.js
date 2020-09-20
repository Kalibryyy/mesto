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
        
        console.log('вызван сабмит');
        console.log(this._modalInput.value);
        
        this._modalInputValue = this._modalInput.value;
        this._handleFormSubmit(this._modalInputValue); // передать ему юрл?

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