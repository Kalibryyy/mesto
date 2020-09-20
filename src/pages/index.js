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

//лучше используйте Promise.all чтобы дождаться получения всех начальнх данных (данных пользователя и данных по карточкам), 
//а потом вообще весь свой код перенесите в then, который придет после этого promise.all тогда у вас всем переменным 
//внутри этого then, включая функции, будет доступна ссылка на данные полученные из апи

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
      console.log(cardItem);

      popupWithImage.open(cardItem);
    },
    handleLikePut: (cardItem) => {
      console.log('вызван put');
      console.log(cardItem);

      api.put('cards/likes', cardItem.id)
        .then(newCardData => {
          card.updateLikes(newCardData);
        })
        .catch(err => console.log(`Изменения статуса лайка: ${err}`));
    },
    handleLikeRemove: (cardItem) => {
      console.log('вызван delete');

      api.delete('cards/likes', cardItem.id)
        .then(newCardData => {
          card.updateLikes(newCardData);
        })
        .catch(err => console.log(`Изменения статуса лайка: ${err}`));
    },
    handleCardDelete: (cardItem) => {
      console.log(`${cardItem.id} - cardItem.id`);
      submitPopup.setSubmitAction(() => {
        console.log(cardItem.id);

        api.delete('cards', cardItem.id)
          .then((res) => {
            console.log(res);

            card._handleCardRemove();
          })
          .catch(err => console.log(err));
        //  сюда прописать действия которые необходимо выполнить после нажатия 
        // на кнопку внутри попапа подтверждения
      })
      submitPopup.open();

      // а тут открыть попап уже с установленным действием, то есть удалением текущей карточки
    }
  });

  //переопределять выполняемую функцию надо только после нажатия на кнопку удаления 
  //(перед непосредственным открытием попапа)

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);
}

cardsList.renderItems();

const newCardPopup = new PopupWithForm('.modal_type_new-card', {
  handleFormSubmit: (formData) => {
    api.addCard('cards', formData)
      .then((formData) => {
        cardRenderer(formData);
      });
  }
});

const newAvatar = new PopupAvatarUpdate('.modal_type_avatar', {
  handleFormSubmit: (formUrl) => {
    spinner.renderLoading(true);

    api.updateAvatar('users/me/avatar', formUrl) // url нового аватара
      .then(() => {
        document.querySelector('.profile__avatar').style.backgroundImage = `${formUrl}`; //перезагрузить страничку?
      })
      .finally(() => {
        spinner.renderLoading(false);
      });
  }
});

// Перед зпросом не забудьте запустить прелодер, то есть как-то отобразить в интерфейсе что запрос ушел 
// и в данный момент ожидается его ответ (в ТЗ тоже об этом сказано). 
// После ответа сервера (если он ок), вам надо заменить картинку на фронте и отключить прелодер, а затем закрыть попап

console.log(newAvatar);

newAvatar.setEventListeners();
document.querySelector('.profile__avatar').addEventListener('click', () => {
  newAvatar.open();
})

const popupWithImage = new PopupWithImage('.modal_type_picture');

popupWithImage.setEventListeners();

const userInfoPopup = new PopupWithForm('.modal_type_profile', {
  handleFormSubmit: (data) => {
    api.updateInfo('users/me', data)
      .then((data) => {
        userInfo.setUserInfo(data); //с помощью setUserInfo устанавливаем данные в разметку после сабмита формы
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

// fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
//   headers: {
//   authorization: '4b693f44-f60e-4f4e-bfd2-2bb476e7515d'
// }
// })
// .then(res => {res.json})
// .then((data) => {
//   debugger
// });
