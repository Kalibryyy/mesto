import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupContainer = this._popup.querySelector('.modal__container');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем обработчик сабмита формы
    this._popupContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleSubmitCallback();
    });
  }
}

