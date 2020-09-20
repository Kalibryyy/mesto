import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {
      handleFormSubmit
    }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupContainer = this._popup.querySelector('.modal__container');
      this._submitBtn = this._popup.querySelector('.modal__btn')
    }
  
    // собирает данные всех полей формы
    _getInputValues() {
      this._inputList = Array.from(this._popup.querySelectorAll('.modal__input'));
      this._formValues = {};
  
      // создаём ключ в объекте по значению атрибута name
      // в значении будет value инпута, по которому мы проходим циклом
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      })
  
      return this._formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      // добавляем обработчик сабмита формы
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
  
        this._handleFormSubmit(this._getInputValues());
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
      this._popupContainer.reset();  
    }
  }