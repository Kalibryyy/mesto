import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import {
  initialCards,
  object,
  editButton,
  addButton,
  elementsList,
  editForm,
  addForm,
  nameInput,
  jobInput,
  openImage,
  pictureText
} from '../utils/constants.js';

const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '.template_type_default', {
      handleCardClick: (cardData) => {
        popupWithImage.open(cardData);
      }
    });

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, elementsList);

cardsList.renderItems();

// отвечает за открытие и закрытие попапа
class Popup {
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

//наследует от Popup. Этот класс должен перезаписывать родительский метод open. 
//В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения.

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    super.open();

    // вставляем в попап картинку и атрибут src изображения
    openImage.src = cardData.link;
    openImage.alt = cardData.name;
    pictureText.textContent = cardData.name;

    this._popup.querySelector('.modal__picture-overlay').addEventListener('click', () => this._handleOverlayClose());
  }

  close() {
    super.close();

    this._popup.querySelector('.modal__picture-overlay').removeEventListener('click', () => this._handleOverlayClose());
  }
}

const popupWithImage = new PopupWithImage('.modal_type_picture');

popupWithImage.setEventListeners();

class PopupWithForm extends Popup {
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
    // снять слушатель сабмита?
  }
}

class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов: 
  // элемента имени пользователя и элемента информации о себе
  constructor({
    nameElement,
    infoElement
  }) {
    this._nameElement = document.querySelector(nameElement);
    this._infoElement = document.querySelector(infoElement);
  }

  //возвращает объект с данными пользователя 
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      userName: this._nameElement.textContent, //взять textContent из разметки
      userInfo: this._infoElement.textContent
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._nameElement.textContent = data.name; // установить textContent в разметку
    this._infoElement.textContent = data.link;
  }
}

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  infoElement: '.profile__occupation'
});

//с помощью setUserInfo установить данные в разметку после сабмита формы
const userInfoPopup = new PopupWithForm('.modal_type_profile', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

userInfoPopup.setEventListeners()

const newCardPopup = new PopupWithForm('.modal_type_new-card', {
  handleFormSubmit: (formData) => {
    // при создании экземпляра Card передаём
    // ему объект с данными формы
    const card = new Card(formData, '.template_type_default', {
      handleCardClick: () => {
        card.addEventListener('click', () => {
          popupWithImage.open();
        });
      }
    });

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
});

newCardPopup.setEventListeners();

// с помощью getUserInfo берём данные из разметки перед открытием попапа с данными пользователя:
editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.userName;
  jobInput.value = currentUserInfo.userInfo;
  userInfoPopup.open();
});

addButton.addEventListener('click', () => {
  newCardPopup.open();
});



const editFormValidator = new FormValidator(object, editForm);
const addFormValidator = new FormValidator(object, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
