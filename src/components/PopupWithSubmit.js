import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем обработчик сабмита формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitCallback();
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

