import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Spinner from '../components/Spinner.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupAvatarUpdate from '../components/PopupAvatarUpdate.js';

import {
  object,
  editButton,
  addButton,
  elementsList,
  editForm,
  addForm,
  avatarForm,
  nameInput,
  jobInput,
  modalBtnNewCard,
} from '../utils/constants.js';

import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/',
  headers: {
    authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d',
    'Content-Type': 'application/json'
  }
});

const currentUserID = '98f0b3a604cd2bd64a8fb924';

const spinner = new Spinner(document.querySelector('.spinner'));

const initialUserInfo = api.getUserInfo('users/me');

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  infoElement: '.profile__occupation'
});

userInfo.setInitialUserInfo(initialUserInfo);

const initialCards = api.getInitialCards('cards');

const cardsList = new Section({
  renderer: (cardItem) => {
    cardRenderer(cardItem);
  }
}, elementsList, initialCards, spinner);

function cardRenderer(item) {
  createCard(item);
}

const submitPopup = new PopupWithSubmit('.modal_type_confirm-card-del');
submitPopup.setEventListeners();

function createCard(cardItem) {
  const card = new Card(cardItem, '.template_type_default', currentUserID, {
    handleCardClick: (cardItem) => {
      popupWithImage.open(cardItem);
    },
    handleLikePut: (cardItem) => {

      api.put('cards/likes', cardItem.id)
        .then(newCardData => {
          card.updateLikes(newCardData);
        })
        .catch(err => console.log(`Изменения статуса лайка: ${err}`));
    },
    handleLikeRemove: (cardItem) => {
      api.delete('cards/likes', cardItem.id)
        .then(newCardData => {
          card.updateLikes(newCardData);
        })
        .catch(err => console.log(`Изменения статуса лайка: ${err}`));
    },
    handleCardDelete: (cardItem) => {
      submitPopup.setSubmitAction(() => {

        api.delete('cards', cardItem.id)
          .then(() => {
            card._handleCardRemove();
          })
          .catch(err => console.log(err));
      })
      submitPopup.open();
    }
  });

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);
}

cardsList.renderItems();

const newCardPopup = new PopupWithForm('.modal_type_new-card', {
  handleFormSubmit: (formData) => {
    newCardPopup.changeSaveCaption(true);
    api.addCard('cards', formData)
      .then((formData) => {
        cardRenderer(formData);
      })
      .finally(() => {
        newCardPopup.changeSaveCaption(false);
      });
  }
});

const newAvatar = new PopupAvatarUpdate('.modal_type_avatar', {
  handleFormSubmit: (avatarUrl) => {
    newAvatar.changeSaveCaption(true);

    api.updateAvatar('users/me/avatar', avatarUrl) 
      .then((data) => {
        userInfo.setUserInfo(data); 
      })
      .finally(() => {
        newAvatar.changeSaveCaption(false);
      });
  }
});

newAvatar.setEventListeners();
document.querySelector('.profile__avatar').addEventListener('click', () => {
  newAvatar.open();
});

const popupWithImage = new PopupWithImage('.modal_type_picture');

popupWithImage.setEventListeners();

const userInfoPopup = new PopupWithForm('.modal_type_profile', {
  handleFormSubmit: (data) => {
    userInfoPopup.changeSaveCaption(true);

    api.updateInfo('users/me', data)
      .then((data) => {
        userInfo.setUserInfo(data); //с помощью setUserInfo устанавливаем данные в разметку после сабмита формы
      })
      .finally(() => {
        userInfoPopup.changeSaveCaption(false);
      });
  }
});

userInfoPopup.setEventListeners()

newCardPopup.setEventListeners();

editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo(); // с помощью getUserInfo берём данные из разметки перед открытием попапа с данными пользователя
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
const newAvatarValidator = new FormValidator(object, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
newAvatarValidator.enableValidation();


