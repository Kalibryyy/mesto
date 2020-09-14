import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {
      handleFormSubmit
    }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
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
      console.log(this._formValues);
  
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
  
    open() {
      super.open();
      this._popup.querySelector('.modal__overlay').addEventListener('click', () => this._handleOverlayClose());
    }
  
    close() {
      super.close();
      this._popup.querySelector('.modal__container').reset();
      this._popup.querySelector('.modal__overlay').removeEventListener('click', () => this._handleOverlayClose());
    }
  }