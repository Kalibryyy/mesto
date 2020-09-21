import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Spinner from '../components/Spinner.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

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
  updateAvatarButton
} from '../utils/constants.js';

import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/',
  headers: {
    authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d',
    'Content-Type': 'application/json'
  }
});

const spinner = new Spinner(document.querySelector('.spinner'));

api.getAppInfo('users/me', 'cards')
  .then((values) => {
    const [userData, cardsArray] = values;

    userInfo.setUserInfo(userData);

    const cardsList = new Section({
      renderer: (cardItem) => {
        cardRenderer(cardItem);
      }
    }, elementsList, cardsArray);

    function cardRenderer(item) {
      spinner.renderLoading(true);
      createCard(item);
    }

    function createCard(cardItem) {
      const card = new Card(cardItem, '.template_type_default', userData._id, {
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
                card.handleCardRemove();
              })
              .then(() => submitPopup.close())
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
          .then(() => newCardPopup.close())
          .catch(err => console.log(err))
          .finally(() => {
            newCardPopup.changeSaveCaption(false);
          });
      }
    });

    newCardPopup.setEventListeners();
    addButton.addEventListener('click', () => {
      newCardPopup.open();
      addFormValidator.disableButton(modalBtnNewCard);
    });
  })
  .catch(err => console.log(err))
  .finally(() => {
    spinner.renderLoading(false);
  });

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  infoElement: '.profile__occupation'
});

const userInfoPopup = new PopupWithForm('.modal_type_profile', {
  handleFormSubmit: (data) => {
    userInfoPopup.changeSaveCaption(true);

    api.updateInfo('users/me', data)
      .then((data) => {
        userInfo.setUserInfo(data); //с помощью setUserInfo устанавливаем данные в разметку после сабмита формы
      })
      .then(() => newCardPopup.close())
      .catch(err => console.log(err))
      .finally(() => {
        userInfoPopup.changeSaveCaption(false);
      });
  }
});

userInfoPopup.setEventListeners();

const newAvatar = new PopupWithForm('.modal_type_avatar', {
  handleFormSubmit: (avatarUrl) => {
    newAvatar.changeSaveCaption(true);

    api.updateAvatar('users/me/avatar', avatarUrl.link)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => newCardPopup.close())
      .catch(err => console.log(err))
      .finally(() => {
        newAvatar.changeSaveCaption(false);
      });
  }
});

newAvatar.setEventListeners();

const submitPopup = new PopupWithSubmit('.modal_type_confirm-card-del');

submitPopup.setEventListeners();

const popupWithImage = new PopupWithImage('.modal_type_picture');

popupWithImage.setEventListeners();

updateAvatarButton.addEventListener('click', () => {
  newAvatar.open();
});

editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo(); // с помощью getUserInfo берём данные из разметки перед открытием попапа с данными пользователя
  nameInput.value = currentUserInfo.userName;
  jobInput.value = currentUserInfo.userInfo;
  userInfoPopup.open();
});

const editFormValidator = new FormValidator(object, editForm);
const addFormValidator = new FormValidator(object, addForm);
const newAvatarValidator = new FormValidator(object, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
newAvatarValidator.enableValidation();
