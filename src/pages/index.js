import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  modalBtnNewCard
} from '../utils/constants.js';

import './index.css';

function createCard (cardItem) {
  const card = new Card(cardItem, '.template_type_default', {
    handleCardClick: (cardItem) => {
      popupWithImage.open(cardItem); 
    }
  }); 
  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);
}

const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    createCard(cardItem);
  }
}, elementsList);

cardsList.renderItems();

const popupWithImage = new PopupWithImage('.modal_type_picture');

popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  infoElement: '.profile__occupation'
});

//с помощью setUserInfo устанавливаем данные в разметку после сабмита формы
const userInfoPopup = new PopupWithForm('.modal_type_profile', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

userInfoPopup.setEventListeners()

const newCardPopup = new PopupWithForm('.modal_type_new-card', {
  handleFormSubmit: (formData) => {
    createCard(formData);
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
  addFormValidator.disableButton(modalBtnNewCard);
});

const editFormValidator = new FormValidator(object, editForm);
const addFormValidator = new FormValidator(object, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
